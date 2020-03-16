<template>
    <div class="messages-list">
        <template v-if="typingUser">
            <div class="typing-user">
                {{ typingUser }} is typing ...
            </div>
        </template>
        <template v-for="(group, index) in groupedMessages">
            <div :key="index" class="messages-group">
                <template v-if="group[0].user.id !== $auth().id">
                    <div>
                        <el-avatar class="messages-group__avatar" shape="circle" :size="32" fit="cover" :src="group[0].user.avatar" />
                    </div>
                </template>
                <div class="messages-group__items">
                    <div>
                        <template v-for="message in group">
                            <messageItem :key="message.id" :message="message" />
                        </template>
                    </div>
                    <div 
                        class="messages-group__date"
                        :class="`messages-group__date--${$auth().id == group[0].user.id ? 'sender-message' : 'receiver-message'}`"
                    >{{ $timeFromNow(group[0].createdAt) }}</div>
                </div>
            </div>
        </template>
        <div>
            <div style="height: 16px"></div>
        </div>
    </div>
</template>

<script>
import messageItem from '~/components/app/messageItem'
import { PubSub } from 'pubsub-js'
import _ from 'lodash'

export default {
    components: {
        messageItem
    },
    props: {
        conversation: { type: Object, required: true }
    },
    data() {
        return {
            typingUser: '',
            typingSubscriber: null,
            messageSubscriber: null,
            messages: []
        }
    },
    computed: {
        groupedMessages() {
            let messages = _.uniqBy(this.messages, 'id')
            messages = _.orderBy(messages, 'id', 'desc')
            return messages.reduce((all, item, index) => {
                const groupIndex = (() => {
                    if (index === 0) return 0
                    else if (messages[index - 1].user.id === item.user.id) return all.length - 1
                    else return all.length
                })()
                if (!all[groupIndex]) {
                    all[groupIndex] = []
                }
                all[groupIndex].unshift(item)
                return all
            }, [])
        }
    },
    created() {
        this.typingSubscriber = PubSub.subscribe(this.conversation.roomId + '-typing', (_, data) => {
            this.typingUser = data
        })
        this.messageSubscriber = PubSub.subscribe(this.conversation.roomId + '-message', (_, data) => {
            this.messages.unshift(data)
        })
    },
    mounted() {
        this.$chatkit.currentUser.fetchMultipartMessages({
            roomId: this.conversation.roomId,
            direction: 'newer',
            limit: 100,
        })
        .then(messages => {
            this.messages = messages.map(message => ({
                id: message.id,
                content: message.parts[0].payload.content,
                createdAt: message.createdAt,
                user: this.conversation.participants.find(p => p.id == message.senderId)
            }))
        })
    },
    beforeDestroy() {
        if(this.messageSubscriber) PubSub.unsubscribe(this.messageSubscriber)
        if(this.typingSubscriber) PubSub.unsubscribe(this.typingSubscriber)
    }
}
</script>

<style lang="scss">
.messages-list {
    display: flex;
    flex-direction: column-reverse;
    padding-right: 16px;
    padding-left: 16px;
}
.messages-group {
    display: flex;
    margin-top: 8px;
    &__items {
        flex-grow: 1;
    }
    &__avatar {
        margin-right: 8px;
    }
    &__date {
        display: flex;
        color: #797979;
        font-size: 12px;
        &--sender-message {
            justify-content: flex-end;
        }
    }
}

.typing-user {
    color:#797979;
    font-size: 13px;
    margin-top: 10px;
    text-align: center;
}
</style>