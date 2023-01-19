import { Video } from './model/video.model';
import { Action } from "@ngrx/store"

export const SET_CURRENT_STATE = '[Video] Set current state'

export const SET_IS_FILTERED = '[Video] Set true to filtered boolean'
export const SET_IS_UNFILTERED = '[Video] Set false to filtered boolean'

export const SET_LIST = '[Video] Set a list'

export const FILTER_LIST = '[Video] Filter a list'

export const POP_VIDEO = '[Video] Pop video to a list'

export const ADD_VIDEO = '[Video] Add video to a list'


//Current State

export class SetCurrentSate implements Action {
    readonly type = SET_CURRENT_STATE

    constructor(public payload: "TOADD" | "ADDED" | "TOSEE" | "SEEN"){}
}

// Filtered boolean

export class SetIsFiltered implements Action {
    readonly type = SET_IS_FILTERED
}

export class SetIsUnfiltered implements Action {
    readonly type = SET_IS_UNFILTERED
}

// Set Lists

export class SetList implements Action {
    readonly type = SET_LIST

    constructor(public payload: {list: string, videos: Video[]}){}
}


// Filter lists

export class FilterList implements Action {
    readonly type = FILTER_LIST

    constructor(public payload: {list: string, query: string}){}
}


// Pop One Video from a list

export class PopVideo implements Action {
    readonly type = POP_VIDEO

    constructor(public payload: Video){}
}


// Add one video to a list

export class AddVideo implements Action {
    readonly type = ADD_VIDEO

    constructor(public payload: Video){}
}


export type VideoActions = SetCurrentSate |
    SetIsFiltered | SetIsUnfiltered | SetList
    | FilterList | PopVideo | AddVideo