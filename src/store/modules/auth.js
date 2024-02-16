import CryptoJS from 'crypto-js'
import axios from 'axios';
const state = {
  username: '',
  event_id: '',
  activity_id: '',
  activity_type_id: '',
  auction_id: '',
  role:'',
  id:-1,
};

const getters = {
    isAuthenticated: state => state.username,    
    StateUsername: state => state.username,
    Event_id: state => state.event_id,
    Activity_id: state => state.activity_id,
    ActivityType_id: state => state.activitytype_id,
    Auction_id: state => state.auction_id,
    getRole: state => state.role,
    getId: state => state.id
};

const actions = {
async LogIn({commit},bad_form) {
  //console.log(CryptoJS.DES.encrypt('powerpuffgirls', process.env.VUE_APP_API_KEY).toString())
  const form = {
    username: bad_form.username,
    password: bad_form.password
  }
  let password = ""
  let role = ""
  let id = -1
  
  await axios.post(process.env.VUE_APP_JEEC_BRAIN_URL + '/login',{username : form.username}, {auth: {
    username: process.env.VUE_APP_JEEC_WEBSITE_USERNAME, 
    password: process.env.VUE_APP_JEEC_WEBSITE_KEY
  }}).then(response=> {
    password = response.data.password
    role = response.data.role
    id = response.data.id
  if (password != ""){
    password = CryptoJS.DES.decrypt(password, process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
    
    
    // console.log(CryptoJS.DES.decrypt('U2FsdGVkX1/9mDtULMm8MIi6b3igsMB4L9Xsc+izObuyKlkhy4bFOg==', process.env.VUE_APP_API_KEY).toString(CryptoJS.enc.Utf8))
    if (password.normalize() === form.password.normalize()){
      commit('setUser',form.username)
      commit('setRole',role)
      commit('setId',id)
      console.log("Updated authentication - success")
    }
    else{
      commit('LogOut')
      console.log("Updated authentication - logout")
    }
  }
  else{
    commit('LogOut')
    console.log("Updated authentication - logout")
  }
  })
},
async LogOut({commit}){
  commit('LogOut')
}


};
const mutations = {
    setUser(state, username){
        state.username = username
    },
    setRole(state, role) {
      state.role = role
    },
    LogOut(state){
        state.username = ''
        state.role = ''
    },
    setEvent_id(state, event_id) {
      state.event_id = event_id
    },
    setActivity_id(state, activity_id) {
      state.activity_id = activity_id
    },
    setActivityType_id(state, activitytype_id) {
      state.activitytype_id = activitytype_id
    },
    setAuction_id(state, auction_id) {
      state.auction_id = auction_id
    },
    setId(state, id){
      state.id = id
    }
    
};

export default {
  state,
  getters,
  actions,
  mutations
};


