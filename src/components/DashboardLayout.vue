<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title"> Ariyani </v-list-item-title>
                    <v-list-item-subtitle> 180709805 </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
                <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                tag="router-link"
                :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list> 
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <VSpacer />
                <v-toolbar-items>
                    <v-btn href="/profile">
                        <v-icon>mdi-account-circle</v-icon>
                    </v-btn>
                    <v-btn @click="logout">
                        <v-icon >mdi-power</v-icon>
                    </v-btn>
                </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div> 
</template>
<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                drawer: true,
                items: [
                    { title: "Dashboard", to: "/dashboard" },
                    { title: "Product", to: "/products" },
                ],
            };
        },
        methods: {
            logout(){
                localStorage.removeItem('token')
                this.$router.replace('/login')
            }
        }
    };
</script>
<style scoped>
    .fullheight {
        min-height: 100vh !important;
    }
    .router {
        text-decoration: none; 
        color: black;
    } 
</style>

