<template>
    <center>
        <h1>Your Profile</h1>
        <br>
        <p><b>Name:</b> {{ user.name }}</p>
        <p><b>Username:</b> {{ user.username }}</p>
        <p><b>Email:</b> {{ user.email }}</p>
        <p><b>Role:</b> {{ user.role }}</p>
    </center>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: mapGetters(["user"]),
    methods:{
        ...mapActions(['getProfile'])
    },
    created(){
       this.getProfile();
    }
}
</script>