import Vue from 'vue'
import VueRouter from 'vue-router'
//import CompaniesLogin from '../views/CompaniesLogin.vue'
import AddCompany from '../views/companies/AddCompany.vue'
import AddEvent from '../views/events/AddEvent.vue'
import AddMeal from '../views/meals/AddMeal.vue'
import check_rewards from '../views/check_rewards.vue'
import AddDashboardCompanies from '../views/companies/AddDashboardCompanies.vue'
import EditCompany from '../views/companies/EditCompany.vue'
import EditEvent from '../views/events/EditEvent.vue'
import EditMeal from '../views/meals/EditMeal.vue'
import MealsDashboard from '../views/meals/MealsDashboard.vue'
import MealsDishes from '../views/meals/MealsDishes.vue'
import EventDashboard from '../views/events/EventDashboard.vue'
import Dashboard from '../views/Dashboard.vue'
import Speakersdashboard from '../views/speakers/Speakersdashboard.vue'
import Addspeaker from '../views/speakers/Addspeaker.vue'
import UpdateSpeaker from '../views/speakers/UpdateSpeaker.vue'
import Addteam from '../views/teams/Addteam.vue'
import Addteammember from '../views/teams/Addteammember.vue'
import Teammemberdashboard from '../views/teams/Teammemberdashboard.vue'
import Teamsdashboard from '../views/teams/Teamsdashboard.vue'
import Updateteammember from '../views/teams/Updateteammember.vue'
import Updateteam from '../views/teams/Updateteam.vue'
import AdminLogin from '../views/admin_login'
import students_app_dashboard from '../views/students/students_app_dashboard.vue'
import levels_dashboard from '../views/levels/levels_dashboard.vue'
import tags_dashboard from '../views/tags/tags_dashboard.vue'
import squads_dashboard from '../views/squads/squads_dashboard.vue'
import banned_students_dashboard from '../views/students/banned_students_dashboard.vue'
import students_dashboard from '../views/students/students_dashboard.vue'
import add_reward from '../views/rewards/add_reward.vue'
import update_reward from '../views/rewards/update_reward.vue'
import rewards_dashboard from '../views/rewards/rewards_dashboard.vue'
import squad_rewards_dashboard from '../views/rewards/squad_rewards_dashboard.vue'
import jeecpot_rewards_dashboard from '../views/rewards/jeecpot_dashboard.vue'
import ActivitiesDashboard from '../views/activities/activities_dashboard.vue'
import ActivityTypesDashboard from '../views/activities/activity_types_dashboard'
import AddActivityType from '../views/activities/add_activity_type'
import AddActivity from '../views/activities/add_activity'
import AddAuction from '../views/auctions/add_auction'
import AuctionParticipantsDashboard from '../views/auctions/auction_participants_dashboard'
import AuctionsDashboard from '../views/auctions/auctions_dashboard'
import UpdateActivityType from '../views/activities/update_activity_type'
import UpdateActivity from '../views/activities/update_activity'
import UpdateAuction from '../views/auctions/update_auction'
import QRCode from '../views/activities/QRCode.vue'
import AddCompanyUser from '../views/users/AddCompanyUser.vue'
import AddTeamUser from '../views/users/AddTeamUser.vue'
import UsersDashboard from '../views/users/UsersDashboard.vue'
import Quests from '../views/quests/Quests.vue'
import AddQuest from '../views/quests/AddQuest.vue'
import UpdateQuest from '../views/quests/UpdateQuest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/companies/add-company',
    name: 'add-company',
    component: AddCompany
   },
   {
    path: '/companies/add-event',
    name: 'add-event',
    component: AddEvent
   },
   {
    path: '/meals/add-meal',
    name: 'add-meal',
    component: AddMeal
   },
   {
    path: '/companies',
    name: 'add-dash-company',
    component: AddDashboardCompanies
   },
   {
    path: '/companies/edit-company/:company_external_id',
    name: 'edit-company',
    component: EditCompany
   },
   {
    path: '/events/edit-event/:event_external_id',
    name: 'edit-event',
    component: EditEvent
   },
   {
    path: '/meals/edit-meal/:meal_external_id',
    name: 'edit-meal',
    component: EditMeal
   },
   {
    path: '/meals',
    name: 'dashboard-meal',
    component: MealsDashboard
   },
   {
    path: '/meals/dishes/:meal_external_id',
    name: 'meal-dishes',
    component: MealsDishes
   },
   {
    path: '/events',
    name: 'event-dashboard',
    component: EventDashboard
   },
  {
    path: '/',
    name: 'admin-login',
    component: AdminLogin
  },  
  {
    path: '/teamdashboard/:externalid',
    name: 'teamdashboard-main',
    component: Teammemberdashboard 
  },
  {
    path: '/speakers',
    name: 'dashboard-speaker',
    component: Speakersdashboard
  },
  {
    path: '/new-speaker',
    name: 'addspeaker-main',
    component: Addspeaker
  },
  { 
    path: '/speaker/:external_id',
    name: 'update-speaker',
    component: UpdateSpeaker
  },
  {
    path: '/teams/addteam',
    name: 'addteam-main',
    component: Addteam
  },
  {
    path: '/teams/addteammember/:externalid',
    name: 'addteammember-main',
    component: Addteammember
  },
  {
    path: '/teams/',
    name: 'teamsdashboard-main',
    component: Teamsdashboard
  },
  { 
    path: '/teams/members/:externalid/:member_id',
    name: 'updateteammember-main',
    component: Updateteammember
  },
  {
    path: '/teams/updateteam/:externalid',
    name: 'update-team',
    component: Updateteam
  },
  {
    path: '/students-app',
    name: 'students-app-dashboard',
    component: students_app_dashboard, 
  },
  
  {
    path: '/levels',
    name: 'levels-dashboard',
    component: levels_dashboard, 
  },

  {
    path: '/tags',
    name: 'tags-dashboard',
    component: tags_dashboard, 
  },

  {
    path: '/squads',
    name: 'squads-dashboard',
    component: squads_dashboard, 
  },

  {
    path: '/students',
    name: 'students-dashboard',
    component: students_dashboard, 
  },

  {
    path: '/students/banned',
    name: 'banned-students-dashboard',
    component: banned_students_dashboard, 
  },

  {
    path: '/rewards',
    name: 'rewards-dashboard',
    component: rewards_dashboard, 
  },
  {
    path: '/rewards/add',
    name: 'add-reward',
    component: add_reward, 
  },

  {
    path: '/rewards/update/:external_id',
    name: 'update-reward',
    component: update_reward, 
  },

  {
    path: '/rewards/squad',
    name: 'squad-rewards-dashboard',
    component: squad_rewards_dashboard, 
  },

  {
    path: '/rewards/jeecpot',
    name: 'jeecpot-rewards-dashboard',
    component: jeecpot_rewards_dashboard, 
  },
  {
    path: '/dashboard/',
    name: 'dashboard-main',
    component: Dashboard
  },
  {
    path: '/activities/qrcode/:activity_external_id',
    name: 'qr-code',
    component: QRCode
  },
  {
    path: '/activities',
    name: 'activities-dashboard',
    component: ActivitiesDashboard
  },
  {
    path: '/activities/types',
    name: 'activity-types-dashboard',
    component: ActivityTypesDashboard
  },
  {
    path: '/activities/new-activity-type',
    name: 'add-activity-type',
    component: AddActivityType
  },
  {
    path: '/activities/new-activity',
    name: 'add-activity',
    component: AddActivity
  },
  {
    path: '/auctions/new-auction',
    name: 'add-auction',
    component: AddAuction
  },
  {
    path: '/auctions/participants/:auction_id',
    name: 'auction-participants-dashboard',
    component: AuctionParticipantsDashboard
  },
  {
    path: '/auctions',
    name: 'auctions-dashboard',
    component: AuctionsDashboard
  },
  {
    path: '/activities/update-type/:activity_type_id',
    name: 'update-activity-type',
    component: UpdateActivityType
  },
  {
    path: '/activities/update/:activity_id',
    name: 'update-activity',
    component: UpdateActivity
  },
  {
    path: '/auctions/update/:auction_id',
    name: 'update-auction',
    component: UpdateAuction
  },
  {
    path: '/usersdashboard',
    name: 'users-dashboard',
    component: UsersDashboard
  },
  {
    path: '/addcompanyuser',
    name: 'add-company-user',
    component: AddCompanyUser
  },
  {
    path: '/addteamuser',
    name: 'add-team-user',
    component: AddTeamUser
  },
  {
    path: '/checkrewards',
    name: 'check-student-rewards',
    component: check_rewards, 
  },
  {
    path: '/quests',
    name: 'quests-dashboard',
    component: Quests
   },
   {
    path: '/quests/add',
    name: 'add-quest',
    component: AddQuest
   },
   {
    path: '/quests/update:quest_external_id',
    name: 'update-quest',
    component: UpdateQuest
   },
   { path: "*", component: AdminLogin },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
