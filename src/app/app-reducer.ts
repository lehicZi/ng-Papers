import { ActionReducerMap, createFeatureSelector, createSelector, Action } from "@ngrx/store"
import * as fromVideo from './video/video-reducer'

export interface State {
    video: fromVideo.State
}

export const reducers: ActionReducerMap<State, any> = {
    video: fromVideo.videoReducer,
}

export const getVideoState = createFeatureSelector<fromVideo.State>('video')

export const getCurrentState = createSelector(getVideoState, fromVideo.getCurrentState)

export const getIsFiltered = createSelector(getVideoState, fromVideo.getIsFiltered)

export const getToAddList = createSelector(getVideoState, fromVideo.getToAddList)
export const getFilteredToAddList = createSelector(getVideoState, fromVideo.getFilteredToAddList)

export const getAddedList = createSelector(getVideoState, fromVideo.getAddedList)
export const getFilteredAddedList = createSelector(getVideoState, fromVideo.getFilteredAddedList)

export const getToSeeList = createSelector(getVideoState, fromVideo.getToSeeList)
export const getFilteredToSeeList = createSelector(getVideoState, fromVideo.getFilteredToSeeList)

export const getSeenList = createSelector(getVideoState, fromVideo.getSeenList)
export const getFilteredSeenList = createSelector(getVideoState, fromVideo.getFilteredSeenList)

export function getList(tab: string){
    switch(tab){

        case "TOADD" :
          return getToAddList
        case "ADDED" :
          return getAddedList
        case "TOSEE" :
          return getToSeeList
        case "SEEN" :
          return getSeenList
        default:
          throw Error("This tab does not exist !")
  
      }
}

export function getFilteredList(tab: string){
    switch(tab){

        case "TOADD" :
          return getFilteredToAddList
        case "ADDED" :
          return getFilteredAddedList
        case "TOSEE" :
          return getFilteredToSeeList
        case "SEEN" :
          return getFilteredSeenList
        default:
          throw Error("This tab does not exist !")
  
      }
}