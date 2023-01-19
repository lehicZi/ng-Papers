
import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Video } from './model/video.model';
import { ADD_VIDEO, FILTER_LIST, POP_VIDEO, SET_CURRENT_STATE, SET_IS_FILTERED, SET_IS_UNFILTERED, SET_LIST, VideoActions } from "./video.actions";

export interface State{
    currentState: "TOADD" | "ADDED" | "TOSEE" | "SEEN"

    toaddList: Video[]
    filteredtoaddList: Video[]

    addedList: Video[]
    filteredaddedList: Video[]

    toseeList: Video[]
    filteredtoseeList: Video[]

    seenList: Video[]
    filteredseenList: Video[]

    filtered: boolean
}

const initialState: State = {
    currentState: "TOADD",

    toaddList : [],
    filteredtoaddList : [],

    addedList : [],
    filteredaddedList : [],

    toseeList : [],
    filteredtoseeList : [],

    seenList : [],
    filteredseenList: [],

    filtered : false,
}

export function videoReducer(state = initialState, action: VideoActions){
    switch (action.type) {
        
        case SET_CURRENT_STATE:
            return{
                ...state,
                currentState: action.payload
            }
            

        case SET_IS_FILTERED:
            return {
                ...state,
                filtered: true
            }
        case SET_IS_UNFILTERED:
            return {
                ...state,
                filtered: false
            }

        case SET_LIST:

            switch(action.payload.list){

                case "TOADD" :
                   return{
                        ...state,
                        toaddList: action.payload.videos,
                        filteredtoaddList: action.payload.videos
                    }
                case "ADDED" :
                    return{
                        ...state,
                        addedList: action.payload.videos,
                        filteredaddedList: action.payload.videos
                    }
                case "TOSEE" :
                    return{
                        ...state,
                        toseeList: action.payload.videos,
                        filteredtoseeList: action.payload.videos
                    }
                case "SEEN" :
                    return{
                        ...state,
                        seenList: action.payload.videos,
                        filteredseenList: action.payload.videos
                    }
                default:
                    throw Error("This tab does not exist !")
            }

        case FILTER_LIST:

            switch(action.payload.list){

                case "TOADD" :
                   return {
                        ...state,
                        filteredtoaddList : (state.toaddList.filter(video => video.title.toLowerCase().includes(action.payload.query.toLowerCase())))
                    }
                case "ADDED" :
                    return {
                        ...state,
                        filteredaddedList : (state.addedList.filter(video => video.title.toLowerCase().includes(action.payload.query.toLowerCase())))
                    }
                case "TOSEE" :
                    return {
                        ...state,
                        filteredtoseeList : (state.toseeList.filter(video => video.title.toLowerCase().includes(action.payload.query.toLowerCase())))
                    }
                case "SEEN" :
                    return {
                        ...state,
                        filteredseenList : (state.seenList.filter(video => video.title.toLowerCase().includes(action.payload.query.toLowerCase())))
                    }
                default:
                    throw Error("This tab does not exist !")
            }


        case POP_VIDEO:

            switch(action.payload.status) {

                case "TOADD" :
                    return{
                        ...state,
                        toaddList: (state.toaddList.filter(video => video.id != action.payload.id)),
                        filteredtoaddList: (state.filteredtoaddList.filter(video => video.id != action.payload.id))
                    }
                case "ADDED" :
                    return{
                        ...state,
                        addedList: (state.addedList.filter(video => video.id != action.payload.id)),
                        filteredaddedList: (state.filteredaddedList.filter(video => video.id != action.payload.id))
                    }
                case "TOSEE" :
                    return{
                        ...state,
                        toseeList: (state.toseeList.filter(video => video.id != action.payload.id)),
                        filteredtoseeList: (state.filteredtoseeList.filter(video => video.id != action.payload.id))
                    }
                case "SEEN" :
                    return{
                        ...state,
                        seenList: (state.seenList.filter(video => video.id != action.payload.id)),
                        filteredseenList: (state.filteredseenList.filter(video => video.id != action.payload.id))
                    }
                default:
                    throw Error("This tab does not exist !")
            }


        case ADD_VIDEO :
            switch(action.payload.status){
                case "TOADD" :
                    return{
                        ...state,
                        toaddList: (state.toaddList.concat(action.payload)),
                        filteredtoaddList: (state.filteredtoaddList.concat(action.payload))
                    }
                case "ADDED" :
                    return{
                        ...state,
                        addedList: (state.addedList.concat(action.payload)),
                        filteredaddedList: (state.filteredaddedList.concat(action.payload))
                    }
                case "TOSEE" :
                    return{
                        ...state,
                        toseeList: (state.toseeList.concat(action.payload)),
                        filteredtoseeList: (state.filteredtoseeList.concat(action.payload))
                    }
                case "SEEN" :
                    return{
                        ...state,
                        seenList: (state.seenList.concat(action.payload)),
                        filteredseenList: (state.filteredseenList.concat(action.payload))
                    }
                default:
                    throw Error("This tab does not exist !")
            }


        default:
            return state
    }
}

export const getCurrentState = (state: State) => state.currentState

export const getToAddList = (state: State) => state.toaddList
export const getFilteredToAddList = (state: State) => state.filteredtoaddList

export const getAddedList = (state: State) => state.addedList
export const getFilteredAddedList = (state: State) => state.filteredaddedList

export const getToSeeList = (state: State) => state.toseeList
export const getFilteredToSeeList = (state: State) => state.filteredtoseeList

export const getSeenList = (state: State) => state.seenList
export const getFilteredSeenList = (state: State) => state.filteredseenList

export const getIsFiltered = (state: State) => state.filtered