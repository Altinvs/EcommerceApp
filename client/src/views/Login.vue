<template>
    <div>
        <div class="row">
            <div class="card mx-auto">
                <div class="card-header text-dark bg-white">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="loginUser">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input id="username" type="text" required placeholder="Username" name="username" v-model="username" class="form-control"> 
                        </div>
                        <br>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" type="password" required placeholder="Password" name="password" v-model="password" class="form-control"> 
                        </div>
                        <br>
                        <input type="submit" class="btn btn-outline-primary" value="Login">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <router-link to="/register" class="card-link">Don't have an account?</router-link>
                    </form>
                </div>
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
                password: ""
            };
        },
        methods:{
            ...mapActions(['login']),
            loginUser(){
                let user = {
                    username: this.username,
                    password: this.password
                };
                console.log(user);
                this.login(user).then(res => {
                    if(res.data.success){
                        this.$router.push('/profile');
                    }
                    window.location.reload();
                }).catch(err => {
                    console.log(err);
                });
            },
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