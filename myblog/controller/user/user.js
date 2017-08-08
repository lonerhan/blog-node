'use strict';

import UserModel from '../../models/user/user'
import formidable from 'formidable'
class User {
    constructor() {

    }
    async login(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async(err, fields, files) => {
            if (err) {
                res.send({
                    status: 0,
                    type: 'FORM_DATA_ERROR',
                    message: '表单信息错误'
                })
                return
            }
            const {user_name, password, status = 1} = fields;
			try{
				if (!user_name) {
					throw new Error('用户名参数错误')
				}else if(!password){
					throw new Error('密码参数错误')
				}
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
            const newpassword = password;
            try{
				const user = await UserModel.findOne({user_name});
				if (!user) {
					console.log('没有用户');
				}else if(newpassword.toString() != user.password.toString()){
					console.log('管理员登录密码错误');
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '该用户已存在，密码输入错误',
					})
				}else{
					req.session.user_id = user.id;
					res.send({
						status: 1,
						success: '登录成功',
                        user:user
					})
				}
			}catch(err){
				console.log('登录管理员失败', err);
				res.send({
					status: 0,
					type: 'LOGIN_ADMIN_FAILED',
					message: '登录管理员失败',
				})
			}
        })
    }

    async add(req, res, next) {
        try {
            const user = {
                user_name: "wuhan",
                password: "wh518328",
                id: 518,
                status: 2,
                city: "guangzhou",
            }
            const shop = new UserModel(user);
            await shop.save();
            res.send({
                status: 1,
                sussess: '添加账号',
            })
        } catch (err) {
            res.send({
                name: 'ERROR_DATA',
                message: '获取数据失败',
            });
        }
    }
}


export default new User()