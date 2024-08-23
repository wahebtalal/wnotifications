import WNotificationComponentAlpinePlugin from './components/wnotification'
import {
    Action as NotificationAction,
    ActionGroup as NotificationActionGroup,
    WNotification,
} from './WNotification.js'

window.WNotificationAction = NotificationAction
window.WNotificationActionGroup = NotificationActionGroup
window.WNotification = WNotification

document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(WNotificationComponentAlpinePlugin)
})
