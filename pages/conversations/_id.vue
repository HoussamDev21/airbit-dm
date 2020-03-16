<template>
    <div class="conversation-container">
        <div class="conversation-header">
            <div class="conversation-header__title">
                {{ title }}
                &nbsp;&nbsp;<div class="online-dot"></div>
            </div>
            <div class="conversation-header__actions">
                <el-button type="primary" icon="el-icon-phone" circle></el-button>
                <el-button type="primary" icon="el-icon-video-camera" circle></el-button>
            </div>
        </div>
        <messagesList :conversation="conversation" />
        <div class="message-form">
            <form @submit.prevent="sendMessage" class="message-form__input">
                <input @keydown="typing" v-model.trim="messageContent" type="text" placeholder="Type a message">
                <div class="message-form__actions">
                    <button>
                        <svg stroke="currentColor" xmlns="http://www.w3.org/2000/svg" width="20.299" height="17.435" viewBox="0 0 20.299 17.435"><defs><style>.a{fill:none;stroke-width:1.73px;fill-rule:evenodd;}</style></defs><path class="a" d="M1547.358,14830.864l17.1-7.228c.767-.334.589-.667-.067-1.113l-17.118-7.118c-.734-.223-.946.11-.857.668v5.227l7.174,1.67c.512.109.7.222.022.333l-7.2,1.778v4.895C1546.412,14831.088,1546.78,14831.2,1547.358,14830.864Z" transform="translate(-1545.527 -14814.468)"/></svg>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import conversations from '~/data/conversations'
import messagesList from '~/components/app/messagesList'

export default {
    components: {
        messagesList
    },
    asyncData({ params }) {
        return {
            conversation: conversations.get(Number(params.id))
        }
    },
    data() {
        return {
            messageContent: '',
        }
    },
    computed: {
        participant() {
            return this.conversation.participants.filter(u => u.id !== this.$auth().id)[0]
        },
        image() {
            return this.participant.avatar
        },
        title() {
            return this.participant.name
        }
    },
    methods: {
        async sendMessage() {
            if (this.messageContent) {
                try {
                    await this.$chatkit.currentUser.sendSimpleMessage({
                        roomId: this.conversation.roomId,
                        text: this.messageContent,
                    })
                    this.messageContent = ''
                } catch (error) {
                    console.log(error)
                }
            }
        },
        typing() {
            this.$chatkit.currentUser.isTypingIn({ roomId: this.conversation.roomId })
        }
    }
}
</script>

<style lang="scss">
.conversation-header {
    padding: 16px;
    border-bottom: 1px solid #221E23;
    display: flex;
    justify-content: space-between;
    &__title {
        font-weight: 700;
        display: flex;
        align-items: center;
    }
}

.online-dot {
    height: 10px;
    width: 10px;
    background: #04E013;
    box-shadow: 0 0 0px 6px #04E01311;
    border-radius: 99px;
}

.conversation-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.messages-list {
    flex-grow: 1;
    overflow: auto;
}

.message-form {
    padding: 16px;
    display: flex;
    &__input {
        flex-grow: 1;
        background: #221E23;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding-right: 6px;
        padding-left: 6px;
        input {
            padding: 10px;
            flex-grow: 1;
            outline: none;
            border: none;
            background: transparent;
            color: #ffffff;
            font-size: 14px;
            ::placeholder {
                color: #ffffff55;
            }
        }
    }
    &__actions {
        display: flex;
        button {
            outline: none;
            cursor: pointer;
            color: #ffffff;
            background: transparent;
            border: none;
            &:hover {
                color: #8F38B1;
            }
        }
    }
}
</style>