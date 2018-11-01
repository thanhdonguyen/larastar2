<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">

                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-success" @click="newModal()">Add New <i class="fas fa-user-plus"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table class="table table-bordered">
                        <tbody>
                        <tr>
                            <th style="width: 10px">ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Regitsted At</th>
                            <th style="width: 100px">Modify</th>
                        </tr>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{user.id}}.</td>
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td><span class="badge bg-success">{{user.type | upText}}</span></td>
                            <td>{{user.created_at | myDate}}</td>
                            <td>
                                <a href="#" @click="editModal(user)">
                                    <i class="fa fa-edit blue"></i>
                                </a>
                                |
                                <a href="#" @click="deleteUser(user.id)">
                                    <i class="fa fa-trash red"></i>
                                </a>
                            </td>
                        </tr>

                        </tbody></table>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer clearfix">
                        <ul class="pagination pagination-sm m-0 float-right">
                            <li class="page-item"><a class="page-link" href="#">«</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">»</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

        <!-- The Modal -->
        <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
            
                <!-- Modal Header -->
                
                    <div class="modal-header">
                        <h4 v-show="editmodal" class="modal-title">Update User Info</h4>
                        <h4 v-show="!editmodal" class="modal-title">Add New</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    
                    <form @submit.prevent="editmodal ? updateUser() : createUser()">
                    <!-- Modal body -->
                    <div class="modal-body">
                        
                        <div class="form-group">
                            <label for="inputName">Name</label>
                            <input v-model="form.name" class="form-control" id="inputName" name="name" :class="{ 'is-invalid': form.errors.has('name') }" placeholder="Enter your name">
                            <has-error :form="form" field="name"></has-error>
                        </div>

                        <div class="form-group">
                            <label for="inputEmail">Email</label>
                            <input v-model="form.email" class="form-control" id="inputEmail" name="email" :class="{ 'is-invalid': form.errors.has('email') }" placeholder="Enter email">
                            <has-error :form="form" field="email"></has-error>
                        </div>

                        <div class="form-group">
                            <label for="inputBio">Bio</label>
                            <textarea v-model="form.bio" class="form-control" id="inputBio" name="bio" :class="{ 'is-invalid': form.errors.has('bio') }" placeholder="Enter bio"> </textarea>
                            <has-error :form="form" field="bio"></has-error>
                        </div>

                        <div class="form-group">
                            <label for="selectType">Select</label>
                            <select class="form-control" name="type" v-model="form.type" id="selectType" :class="{ 'is-invalid' :form.errors.has('type') }">
                                <option value="">Select User Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">Standard User</option>
                                <option value="author">Author</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="inputPassword">Password</label>
                            <input v-model="form.password" type="password" class="form-control" id="inputPassword" placeholder="Password" :class="{ 'is-invalid' :form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>

                        <div class="form-group">
                            <label for="password_confirm">Re-password</label>
                            <input v-model="form.password_confirm" type="password" name="password_confirm" id="password_confirm"
                            class="form-control" :class="{'is-invalid': form.errors.has('password_confirm')}" placeholder="Re-Password">
                            <has-error :form="form" field="password_confirm"></has-error>
                        </div>

                    </div>
                    
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button v-show="editmodal" type="submit" class="btn btn-success">Update</button>
                        <button v-show="!editmodal" type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
                
            </div>
            </div>
        </div>

    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                editmodal: false,
                users: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },

        mounted() {
            // console.log(this.loadUsers())
        },

        methods: {
            updateUser(){
                this.$Progress.start()
                this.form.put('api/user/' + this.form.id)
                .then(() => {
                    $('#myModal').modal('hide')
                    swal(
                        'Updated',
                        'Information has been updated.',
                        'success'
                    )
                    Fire.$emit('AfterCreate')
                    this.$Progress.finish()
                })
                .catch(() => {
                    this.$Progress.fail()
                })
            },
            editModal(user) {
                this.editmodal = true
                this.form.reset()
                $('#myModal').modal('show')
                this.form.fill(user)
            },
            newModal() {
                this.editmodal = false
                this.form.reset()
                $('#myModal').modal('show')
            },
            deleteUser(id){
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                    if (result.value) {
                        this.form.delete('api/user/'+id)
                        .then(()=>{
                            swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                            )
                            Fire.$emit('AfterCreate')
                        })
                        .catch(() => {

                        })
                    }
                }).catch(() => {

                })
            },
            loadUsers() {
                axios.get('api/user').then(({data}) => (this.users = data.data))
            },
            createUser() {
                this.$Progress.start()
                this.form.post('api/user')
                .then( () => {
                    Fire.$emit('AfterCreate')
                    $('#myModal').modal('hide')
                    
                    toast({
                        type: 'success',
                        title: 'Signed in successfully'
                    })
                    
                    this.$Progress.finish()
                })
                .catch(()=>{
                    this.$Progress.fail()
                })
            }
        },

        created() {
            this.loadUsers()
            Fire.$on('AfterCreate',() => {
                this.loadUsers();
            });
        }
    }
</script>
