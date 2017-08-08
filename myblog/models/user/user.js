'use strict';

import mongoose from 'mongoose'
import user from '../../initData/user'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	user_name: String,
	password: String,
	id: Number,
	create_time: {type: String, default: (new Date())},
	User: {type: String, default: '管理员'},
	status: Number,  //1:普通管理、 2:超级管理员
	avatar: {type: String, default: 'default.jpg'},
	city: String,
})

UserSchema.index({id: 1});

const User = mongoose.model('user', UserSchema);
User.findOne((err, data) => {
	if (!data) {
    User.create(user);
	}
});

export default User
