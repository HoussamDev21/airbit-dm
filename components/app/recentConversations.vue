<template>
    <div>
        <template v-for="c in orderedConversations">
            <conversationCard :key="c.id" :conversation="c" />
        </template>
    </div>
</template>

<script>
import conversations from '~/data/conversations'
import conversationCard from '~/components/app/conversationCard'
import _ from 'lodash'

export default {
    components: {
        conversationCard
    },
    data() {
        let list = conversations.filter(c => c.participants.map(p => p.id).includes(this.$auth().id))
        return {
            conversations: list
        }
    },
    created() {
        this.openFirstConversationn()
    },
    computed: {
        orderedConversations() {
            return _.orderBy(this.conversations, 'last_message.created_at', 'desc')
        }
    },
    methods: {
        openFirstConversationn() {
            let firstConversation = this.orderedConversations[0]
            if (firstConversation && this.$route.name === 'index') {
                this.$router.replace({ path: `/conversations/${firstConversation.id}` })
            }
        }
    }
}
</script>

<style>

</style>