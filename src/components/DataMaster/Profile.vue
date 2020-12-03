<!-- @format -->
<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5"> Profile </h3>
        <v-card>
            <v-container>
                <v-card-text>
                    <div class="photo-container">
                        <img :src="'http://127.0.0.1:8000/'+form.image"/>
                    </div>
                    
                    <v-text-field
                        v-model="form.name"
                        label="Name"
                    >
                    </v-text-field>


                    <v-text-field
                        v-model="form.email"
                        label="Email"
                    >
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue darken-1" @click="dialog = true">
                        Ubah Foto
                    </v-btn>
                    <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="update">
                            Save
                        </v-btn>
                </v-card-actions>

            </v-container>
        </v-card>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <h4 class="font-weight-bold">Upload Gambar</h4>
                </v-card-title>
                <form method="POST" enctype="multipart/form-data">
                    <input type="file" @change="imageSelected" class="custom-file-input">
                    <!-- <div v-if="preview" class="mt-3">
                        <img :src="preview"  style="max-height:100px;">
                    </div> -->
                    <v-card-actions>
                    <v-btn color="red darken-1" text @click="dismiss">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" @click="update">
                        Ya
                    </v-btn>
                    </v-card-actions>

                </form>
            </v-card>

        </v-dialog>



    </v-main>
</template>
<script>
export default {
    data(){
        return{
            load: false,
            snackbar: false,
            error_message: '',
            color: '',
            name: '',
            email: '',
            form: [],
            dialog: false,
            image: '',
            preview: null,
        };
    },
    methods:{
        imageSelected(e){
            console.log(e.target.files[0])
            var fileReader = new FileReader()

            fileReader.readAsDataURL(e.target.files[0])

            fileReader.onload = (e) => {
                this.form.image = e.target.result
            }

            console.log(this.form)
        },
        // uploadGambar(){
        //     // let data = new FormData;
        //     // data.append('images', this.image);
        //     let data = {
        //         image: this.image
        //     }
        //     var url = this.$api + '/profile/upload/'+localStorage.getItem('id');
        //     this.$http.post(url, data, {
        //         headers:{
        //             'Authorization': 'Bearer ' + localStorage.getItem('token')
        //         }
        //     }).then(()=>{
        //         this.image = response.data;
        //         this.dialog = false;
                
        //     }).catch(error =>{
        //         this.error_message = error.response.data.message;
        //         console.log('Masuk sini');
        //     })
        // },
        readData(){
            var url = this.$api + '/profile/'+localStorage.getItem('id')
            this.$http.get(url, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.form = response.data.data
                console.log(this.form.image)
                this.dialog = false
            })
        },
        update(){
            let newData = {
                name: this.form.name,
                email: this.form.email,
                image: this.form.image,
            }

            var url = this.$api + '/profile/' + localStorage.getItem('id');
            this.load = true
            this.$http.put(url, newData, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load=false;
                this.form = response.data
                this.readData();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red"
                this.snackbar = true;
                this.load = false;
            })
        },
        dismiss(){
            this.dialog = false
        },

    },
    mounted(){
        this.readData();
    },
    
    
}
</script>
<style scoped>
    .photo-container{
        size: 50%;
        width: 200px;
        height: 200px;
        border-radius: 10%;
        overflow: hidden;
        margin: 0 auto;
        box-shadow: 0px 10px 25px 0px rgba(0, 0, 0, 0.3);
    }
</style>