'use strict';

import mongoose from 'mongoose'
import article from '../../initData/article'
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    title: {
        type: String,
        default: '文章标题'
    }, //文章标题
    publish_time: {
        type: Date,
        default: (new Date())
    }, //文章发表时间
    last_modify_time: {
        type: Date,
        default: (new Date())
    }, //最后修改时间
    read_num: {
        type: Number,
        default: 0
    }, //阅读数
    abstract: {
        type: String,
        default: null
    }, //文章摘要
    content: {
        type: String,
        default: '文章内容(Markdown文本)'
    }, //内容 markdown文本
    html: {
        type: String,
        default: null
    }, //内容 HTML文本
})
articleSchema.statics.getArticles = function () {
    return new Promise(async(resolve, reject) => {
        try {
            const article = await this.find();
            resolve(article)
        } catch (err) {
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            });
            console.error(err);
        }
    })
}
articleSchema.statics.artDel = function (id) {
    return new Promise(async(resolve, reject) => {
        try {
            const article = await this.remove({
                _id: id
            });
            resolve({
                status: '200',
                message: '删除数据成功',
            })

        } catch (err) {
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            });
            console.error(err);
        }
    })
}
articleSchema.statics.getById = function (id) {
    return new Promise(async(resolve, reject) => {
        try {
            console.log(id);
            const article = await this.find({
                _id: id
            });
            resolve(article)
        } catch (err) {
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            });
            console.error(err);
        }
    })
}

const Article = mongoose.model('Article', articleSchema);


Article.findOne((err, data) => {
    if (!data) {
    Article.create(article);
    }
});
export default Article