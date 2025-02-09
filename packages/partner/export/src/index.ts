import { IExportFileType, IFunction, IRenderOptions, IBoundsData, IBounds, ILocationType, ILeaf } from '@leafer/interface'
import { Creator, Matrix, TaskProcessor, FileHelper, Bounds } from '@leafer/core'

import { IExportModule, IExportOptions, IExportResult, IExportResultFunction, IUI } from '@leafer-ui/interface'
import { getTrimBounds } from './trim'


export const ExportModule: IExportModule = {

    export(leaf: IUI, filename: IExportFileType | string, options?: IExportOptions | number | boolean): Promise<IExportResult> {

        this.running = true
        return addTask((success: IExportResultFunction) =>

            new Promise((resolve: IFunction) => {

                const over = (result: IExportResult) => {
                    success(result)
                    resolve()
                    this.running = false
                }

                const { leafer } = leaf
                if (leafer) {

                    leafer.waitViewCompleted(async () => {

                        options = FileHelper.getExportOptions(options)

                        let renderBounds: IBoundsData, trimBounds: IBounds, scaleX = 1, scaleY = 1
                        const { worldTransform, isLeafer, isFrame } = leaf
                        const { slice, trim, onCanvas } = options
                        const scale = options.scale || 1
                        const pixelRatio = options.pixelRatio || 1
                        const screenshot = options.screenshot || leaf.isApp
                        const fill = (isLeafer && screenshot) ? (options.fill === undefined ? leaf.fill : undefined) : options.fill // leafer use 
                        const needFill = FileHelper.isOpaqueImage(filename) || fill, matrix = new Matrix()

                        if (screenshot) {
                            renderBounds = screenshot === true ? (isLeafer ? leafer.canvas.bounds : leaf.worldRenderBounds) : screenshot
                        } else {
                            let relative: ILocationType | ILeaf = options.relative || (isLeafer ? 'inner' : 'local')

                            scaleX = worldTransform.scaleX
                            scaleY = worldTransform.scaleY

                            switch (relative) {
                                case 'inner':
                                    matrix.set(worldTransform).invert()
                                    break
                                case 'local':
                                    matrix.set(worldTransform).divide(leaf.localTransform).invert()
                                    scaleX /= leaf.scaleX
                                    scaleY /= leaf.scaleY
                                    break
                                case 'world':
                                    scaleX = 1
                                    scaleY = 1
                                    break
                                case 'page':
                                    relative = leaf.leafer
                                default:
                                    matrix.set(worldTransform).divide(leaf.getTransform(relative)).invert()
                                    const l = relative.worldTransform
                                    scaleX /= scaleX / l.scaleX
                                    scaleY /= scaleY / l.scaleY
                            }

                            renderBounds = leaf.getBounds('render', relative)
                        }

                        const { x, y, width, height } = new Bounds(renderBounds).scale(scale)

                        let canvas = Creator.canvas({ width: Math.round(width), height: Math.round(height), pixelRatio })
                        const renderOptions: IRenderOptions = { matrix: matrix.scale(scale).translate(-x, -y).withScale(1 / scaleX * scale, 1 / scaleY * scale) }

                        if (slice) {
                            leaf = leafer // render all in bounds
                            renderOptions.bounds = canvas.bounds
                        }


                        canvas.save()

                        if (isFrame && fill !== undefined) {
                            const oldFill = leaf.get('fill')
                            leaf.fill = ''
                            leaf.__render(canvas, renderOptions)
                            leaf.fill = oldFill as string
                        } else {
                            leaf.__render(canvas, renderOptions)
                        }

                        canvas.restore()


                        if (trim) {
                            trimBounds = getTrimBounds(canvas)
                            const old = canvas, { width, height } = trimBounds
                            const config = { x: 0, y: 0, width, height, pixelRatio }

                            canvas = Creator.canvas(config)
                            canvas.copyWorld(old, trimBounds, config)
                        }

                        if (needFill) canvas.fillWorld(canvas.bounds, fill || '#FFFFFF', 'destination-over')
                        if (onCanvas) onCanvas(canvas)

                        const data = filename === 'canvas' ? canvas : await canvas.export(filename, options)
                        over({ data, width: canvas.pixelWidth, height: canvas.pixelHeight, renderBounds, trimBounds })

                    })

                } else {

                    over({ data: false })

                }

            })

        )

    }

}


let tasker: TaskProcessor

function addTask(task: IFunction): Promise<IExportResult> {
    if (!tasker) tasker = new TaskProcessor()

    return new Promise((resolve: IExportResultFunction) => {
        tasker.add(async () => await task(resolve), { parallel: false })
    })
}