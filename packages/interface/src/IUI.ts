import { ILeaf, ILeafComputedData, ILeafData, ILeafInputData, ILeaferCanvas, IRenderOptions, IExportOptions, IExportResult, IPathDrawer, IPointData, IPathCommandData, ILeaferImageConfig, IBoundsData, IObject, IPathString, ILeaferImage, IPathCreator, IAnswer, IPickOptions, IPickResult, IValue } from '@leafer/interface'

import {
    IFillAttrData, IFillInputData, IFillComputedData,
    IBorderComputedData,
    ICornerRadiusAttrData, ICornerRadiusInputData, ICornerRadiusComputedData,
    IStrokeAttrData, IStrokeComputedData, IStrokeInputData,
    IEffectAttrData, IEffectInputData, IEffectComputedData,
    ITextStyleAttrData, ITextStyleInputData, ITextStyleComputedData
} from './ICommonAttr'
import { IOverflow } from './type/IType'
import { ILeafer } from './app/ILeafer'

// Line
export interface ILine extends IUI {
    __: ILineData
    toPoint: IPointData
    points: number[]
    curve: boolean | number
}

interface ILineAttrData {
    toPoint?: IPointData
    points?: number[]
    curve?: boolean | number
}
export interface ILineData extends ILineAttrData, IUIData { }
export interface ILineInputData extends ILineAttrData, IUIBaseInputData { }


// Arrow
export interface IArrow extends ILine {
    __: IArrowData
}

interface IArrowAttrData {

}
export interface IArrowData extends IArrowAttrData, ILineData { }
export interface IArrowInputData extends IArrowAttrData, ILineInputData { }


// Rect
export interface IRect extends IUI {
    __: IRectData
}
export interface IRectData extends IUIData { }
export interface IRectInputData extends IUIBaseInputData { }


// Ellipse
export interface IEllipse extends IUI {
    __: IEllipseData
    startAngle: number
    endAngle: number
    innerRadius: number
}
interface IEllipseAttrData {
    startAngle?: number
    endAngle?: number
    innerRadius?: number
}
export interface IEllipseData extends IEllipseAttrData, IUIData { }
export interface IEllipseInputData extends IEllipseAttrData, IUIBaseInputData { }


// Polygon
export interface IPolygon extends IUI {
    __: IPolygonData
    sides: number
    points: number[]
    curve: boolean | number
}
interface IPolygonAttrData {
    sides?: number
    points?: number[]
    curve?: boolean | number
}
export interface IPolygonData extends IPolygonAttrData, IUIData { }
export interface IPolygonInputData extends IPolygonAttrData, IUIBaseInputData { }


// Star
export interface IStar extends IUI {
    __: IStarData
    corners: number
    innerRadius: number
}
interface IStarAttrData {
    corners?: number
    innerRadius?: number
}

export interface IStarData extends IStarAttrData, IUIData { }
export interface IStarInputData extends IStarAttrData, IUIBaseInputData { }

// Path
export interface IPath extends IUI {
    __: IPathData
}
export interface IPathData extends IUIData {
}
export interface IPathInputData extends IUIBaseInputData {
}

// Pen

export interface IPen extends IGroup, IPathCreator {
    __: IPenData
    pathElement: IPath
    pathStyle: IPathInputData
    path: IPathCommandData
    paint(): void
    clear(): void
}

export interface IPenData extends IGroupData { }
export interface IPenInputData extends IGroupInputData { }


// Text
export interface IText extends ITextStyleAttrData, IUI {
    __: ITextData
    text: string
}
interface ITextAttrData {
    text?: string
}

export interface ITextData extends ITextAttrData, ITextStyleComputedData, IUIData {
    __baseLine?: number
    __lineHeight?: number
    __letterSpacing?: number
    __padding?: number[]
    __clipText?: boolean
    __textBoxBounds?: IBoundsData
}
export interface ITextInputData extends ITextAttrData, ITextStyleInputData, IUIBaseInputData {

}

export interface ITextRowData {
    x?: number
    y?: number
    width?: number
    height?: number
    text?: string
    data?: ITextCharData[]
    words?: ITextWordData[]

    startCharSize?: number
    endCharSize?: number

    paraStart?: boolean // paragraph start
    paraEnd?: boolean // paragraph end
    isOverflow?: boolean
    textMode?: boolean
}

export interface ITextWordData {
    x?: number
    y?: number
    width?: number
    height?: number
    data?: ITextCharData[]
}

export interface ITextCharData {
    x?: number
    y?: number
    width?: number
    height?: number
    char?: string
}

export interface ITextDrawData {
    bounds: IBoundsData
    rows: ITextRowData[]
    paraNumber: number
    font: string
    decorationY?: number
    decorationHeight?: number
    overflow?: number // overflowed row number, not index
}

// Image
export interface IImage extends IRect, ILeaferImageConfig {
    __: IImageData
    url: string
    ready: boolean
    image?: ILeaferImage
}
interface IImageAttrData {
    url?: string
}
export interface IImageData extends IImageAttrData, IRectData {
    __setImageFill(value: string): void
}
export interface IImageInputData extends IImageAttrData, IUIBaseInputData { }

export interface ICanvas extends IRect {
    __: ICanvasData
    smooth: boolean
    canvas: ILeaferCanvas
    __updateSize(): void
}
interface ICanvasAttrData {
    smooth?: boolean
}
export interface ICanvasData extends ICanvasAttrData, IRectData { }
export interface ICanvasInputData extends ICanvasAttrData, IUIBaseInputData { }


// Leafer
export interface ILeaferData extends IGroupData {

}

export interface ILeaferInputData extends IGroupInputData {

}

export interface IAppData extends ILeaferData {

}
export interface IAppInputData extends ILeaferInputData {

}

// Frame
export interface IFrame extends IBox {
    __: IFrameData
}
export interface IFrameData extends IBoxData {

}
export interface IFrameInputData extends IBoxInputData {

}


// Box
export interface IBox extends IGroup {
    __: IBoxData
    overflow: IOverflow
    __updateRectRenderBounds(): void
    __renderGroup(canvas: ILeaferCanvas, options: IRenderOptions): void
}
export interface IBoxData extends IGroupData {
    overflow?: IOverflow
}
export interface IBoxInputData extends IGroupInputData {
    overflow?: IOverflow
}


// Group
export interface IGroup extends IUI {
    __: IGroupData
    children: IUI[]
    pick(hitPoint: IPointData, options?: IPickOptions): IPickResult
    add(child: IUI, index?: number): void
    addAt(child: IUI, index: number): void
    addAfter(child: IUI, after: IUI): void
    addBefore(child: IUI, before: IUI): void
    addMany(...children: ILeaf[]): void
    remove(child?: IUI): void
    removeAll(): void
    clear(): void
}
export interface IGroupData extends IUIData { }
export interface IGroupInputData extends IUIBaseInputData { }

// UI
export interface IUI extends IFillAttrData, IStrokeAttrData, ICornerRadiusAttrData, IEffectAttrData, ILeaf {
    __: IUIData

    readonly app: ILeafer
    leafer?: ILeafer
    parent?: IGroup
    zoomLayer?: IGroup
    readonly isFrame?: boolean

    proxyData: IUIInputData
    __proxyData?: IUIInputData

    normalStyle: IUIInputData
    hoverStyle: IUIInputData
    pressStyle: IUIInputData
    focusStyle: IUIInputData
    selectedStyle: IUIInputData
    disabledStyle: IUIInputData

    children?: IUI[]

    reset(data?: IUIInputData): void

    set(data: IUIInputData): void
    toJSON(): IUIInputData

    get(name?: string | string[] | IUIInputData): IUIInputData | IValue
    createProxyData(): IUIInputData

    find(condition: number | string | IFindUIMethod, options?: any): IUI[]
    findOne(condition: number | string | IFindUIMethod, options?: any): IUI

    getPath(curve?: boolean, pathForRender?: boolean): IPathCommandData
    getPathString(curve?: boolean, pathForRender?: boolean): IPathString

    __drawPathByData(drawer: IPathDrawer, data: IPathCommandData): void
    __drawPathByBox(drawer: IPathDrawer): void
    __drawAfterFill?(canvas: ILeaferCanvas, options: IRenderOptions): void

    export(filename: string, options?: IExportOptions | number | boolean): Promise<IExportResult>
    clone(): IUI
}

export interface IFindUIMethod {
    (leaf: IUI, options?: any): IAnswer
}

export interface IUIData extends IUIComputedData, ILeafData {

    padding?: number | number[]

    normalStyle?: IUIInputData
    hoverStyle?: IUIInputData
    pressStyle?: IUIInputData
    focusStyle?: IUIInputData
    selectedStyle?: IUIInputData
    disabledStyle?: IUIInputData

    // 非数据属性, 自动计算的缓存数据
    __isFills?: boolean
    __isStrokes?: boolean

    readonly __strokeWidth: number

    __pixelFill?: boolean // png / svg / webp
    __pixelStroke?: boolean

    __opacityFill?: boolean  // 半透明的
    __opacityStroke?: boolean

    __drawAfterFill?: boolean
    __isOverflow?: boolean
    __blendLayer?: boolean

    readonly __autoWidth: boolean
    readonly __autoHeight: boolean
    readonly __autoSide: boolean
    readonly __autoSize: boolean

    __boxStroke?: boolean

    // text
    __font?: string
    __textDrawData?: ITextDrawData

    __needComputePaint: boolean
    __computePaint(): void

}
export interface IUIComputedData extends IFillComputedData, IBorderComputedData, IStrokeComputedData, ITextStyleComputedData, ICornerRadiusComputedData, IEffectComputedData, ILeafComputedData {
    padding?: number | number[]
}

export interface IUIBaseInputData extends IFillInputData, IStrokeInputData, ITextStyleInputData, ICornerRadiusInputData, IEffectInputData, ILeafInputData {
    padding?: number | number[]

    normalStyle?: IUIInputData
    hoverStyle?: IUIInputData
    pressStyle?: IUIInputData
    focusStyle?: IUIInputData
    selectedStyle?: IUIInputData
    disabledStyle?: IUIInputData

    children?: IUIInputData[]
}


export type IUITag =
    | 'App'
    | 'Leafer'
    | 'Rect'
    | 'Ellipse'
    | 'Polygon'
    | 'Star'
    | 'Line'
    | 'Path'
    | 'Pen'
    | 'Text'
    | 'Image'
    | 'Canvas'
    | 'Group'
    | 'Frame'
    | 'Box'


export interface IUIInputData extends IRectInputData, IEllipseInputData, IPolygonInputData, IStarInputData, ILineInputData, IPathInputData, ITextInputData, IImageInputData, IGroupInputData, IFrameInputData, IUIBaseInputData, IObject {
    children?: IUIInputData[]
}