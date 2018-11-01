<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Dashboard Component</div>

                    <div class="card-body">
                        I'm an example component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        created() {
            this.$Progress.start()

            this.$router.beforeEach((to, from, next) => {
                this.$Progress.start()
                next()
            })

            this.$router.afterEach((to, from) => {
                this.$Progress.finish()
            })
        },
    }
</script>
