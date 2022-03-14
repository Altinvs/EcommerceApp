<template>
    <center>
        <br>
        <h2>Registered Users</h2>
        <br>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody v-for="user in users" v-bind:key="user._id">
                <tr>
                    <td>{{ user.name }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                </tr>
            </tbody>
        </table>
        <br>
        <a to="/" type="button" class="btn btn-secondary text-white">Go back</a>
    </center>
</template>

<script>
import API from '../api';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default{
    data(){
        return{
            users: [],
        };
    },
    async created(){
        this.users = await API.getAllUser();
    },
    methods:{
    }
};
</script>

<style>
.table{
    height:60%;
    width:60%;
}
</style>