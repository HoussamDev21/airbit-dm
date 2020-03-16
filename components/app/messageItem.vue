<template>
    <div class="message-item" :class="`message-item--${$auth().id == message.user.id ? 'sender-message' : 'receiver-message'}`">
        <div class="content">
            {{ message.content }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: { type: Object, required: true }
    }
}
</script>

<style lang="scss">
.message-item {
    display: flex;
    width: 100%;
    &--sender-message {
        justify-content: flex-end;
        &:first-child {
            .content {
                border-top-right-radius: 2px !important;
            }
        }
        &:last-child {
            .content {
                border-bottom-right-radius: 10px !important;
            }
        }
        .content {
            background: #8F38B1;
            color: #ffffff;
            border-radius: 10px 2px 2px 10px;
        }
    }
    &--receiver-message {
        justify-content: flex-start;
        &:first-child {
            .content {
                border-top-left-radius: 10px !important;
            }
        }
        &:last-child {
            .content {
                border-bottom-left-radius: 10px !important;
            }
        }
        .content {
            background: #ffffff;
            color: #797979;
            border-radius: 2px 10px 10px 2px;
        }
    }
    .content {
        max-width: 50%;
        padding: 8px 12px;
        margin-bottom: 3px;
        font-size: 14px;
    }
}
</style>