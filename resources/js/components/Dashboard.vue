<template>
    <div class="container">
        <div class="row justify-content-center">
            <not-found></not-found>
        </div>
    </div>
</template>

<script>
    export default {
        beforeCreate() {
            this.$Progress.start()
        },
        mounted(){
            this.$Progress.finish()
        }
    }
</script>
