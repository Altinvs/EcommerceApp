<template>
        <div class="row">
            <div class="card mx-auto mt-5">
                <div class="card-header text-dark bg-white">
                    <h4>Register</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="registerUser">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input id="name" type="text" required placeholder="Name" name="name" v-model="name" class="form-control"> 
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input id="username" type="text" required placeholder="Username" name="username" v-model="username" class="form-control"> 
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input id="email" type="email" required placeholder="Email" name="email" v-model="email" class="form-control"> 
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" type="password" required placeholder="Password" name="password" v-model="password" class="form-control"> 
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password</label>
                            <input id="confirm_password" type="password" required placeholder="Confirm Password" name="confirm_password" v-model="confirm_password" class="form-control"> 
                        </div>
                        <br>
                        <input type="submit" class="btn btn-outline-primary" value="Register">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/login" class="card-link">Already have an account?</router-link>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import { mapActions } from 'vuex';
    export default{
        data(){
            return{
                username: "",
                password: "",
                confirm_password: "",
                name: "",
                email: ""
            };
        },
        methods:{
            ...mapActions(['register']),
            registerUser(){
                let user = {
                    username: this.username,
                    password: this.password,
                    confirm_password: this.confirm_password,
                    email: this.email,
                    name: this.name
                }
                this.register(user).then(res => {
                    if(res.data.success){
                        this.$router.push('login');
                    }
                });
            }
        }
    };
</script>

<style>
.card{
    margin-top: 15%;
    width: 50%;
    border-radius: 0;
}
.btn{
    border-radius: 0;
}
.form-control{
    border-radius: 0;
}
</style>