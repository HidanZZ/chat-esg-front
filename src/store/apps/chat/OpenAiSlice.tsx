
import { combineReducers } from '@reduxjs/toolkit'
import ChatCompletion from './components/ChatCompletion'
import FrequentQuestions from './components/FrequentQuestions'



export default combineReducers({
  ChatCompletion,
  FrequentQuestions
})