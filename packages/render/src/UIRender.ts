import { ILeaferCanvas, IRenderOptions } from '@leafer/interface'

import { IUIRenderModule, ILeafPaint, ILeafStrokePaint } from '@leafer-ui/interface'
import { Paint } from '@leafer-ui/external'


export const UIRender: IUIRenderModule = {

    __updateChange(): void {
        let data = this.__
        let complex = data.__isFills || data.__isStrokes || data.cornerRadius || data.__useEffect

        if (complex) {
            data.__complex = true
        } else {
            data.__complex && (data.__complex = false)
        }
    },

    __drawFast(canvas: ILeaferCanvas, _options: IRenderOptions): void {
        const { fill, stroke } = this.__

        this.__drawRenderPath(canvas)

        if (fill) Paint.fill(this, canvas, fill)
        if (stroke) Paint.stroke(this, canvas, stroke)
    },

    __draw(canvas: ILeaferCanvas, options: IRenderOptions): void {
        if (this.__.__complex) {

            const { fill, stroke } = this.__

            this.__drawRenderPath(canvas)

            if (fill) this.__.__isFills ? Paint.fills(this, canvas, fill as ILeafPaint[]) : Paint.fill(this, canvas, fill)
            if (stroke) this.__.__isStrokes ? Paint.strokes(this, canvas, stroke as ILeafStrokePaint[]) : Paint.stroke(this, canvas, stroke)

        } else {

            this.__drawFast(canvas, options)

        }
    }

}