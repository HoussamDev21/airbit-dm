import Vue from 'vue'
import moment from 'moment-timezone'

Vue.prototype.$auth = function () {
    return this.$store.state.Auth.user
}

Vue.prototype.$timeFromNow = (val) => {
    let clientZone = moment.tz.guess()
    let now = moment().tz(clientZone)
    let created_at = moment.utc(val).tz(clientZone)
    let diff = created_at.diff(now)
    let diff_hours = created_at.diff(now, 'hours')
    if (Math.abs(diff_hours) > 24) {
        return created_at.format('MMM DD')
    } else {
        return moment.duration(diff).humanize(true)
    }
}