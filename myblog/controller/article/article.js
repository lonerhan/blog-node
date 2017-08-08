'use strict';

import ArticleModel from '../../models/article/article'
import formidable from 'formidable'
class Article {
	constructor() {

	}
	async getAll(req, res, next) {
		try {
			let article = await ArticleModel.getArticles();
			res.send(article);
		} catch (err) {
			res.send({
				name: 'ERROR_DATA',
				message: '获取数据失败',
			});
		}
	}
	async getById(req, res, next) {
		try {
			let article = await ArticleModel.getById(req.params.id);
			res.send(article);
		} catch (err) {
			res.send({
				name: 'ERROR_DATA',
				message: '获取数据失败',
			});
		}
	}
	async delete(req, res, next) {
		try {

			let article = await ArticleModel.remove({
				_id: req.params.id
			});
			res.send({
				status: 1,
				success: '删除文章成功',
			})
		} catch (err) {
			res.send({
				name: 'ERROR_DATA',
				message: '获取数据失败',
			});
		}
	}
	async save(req, res, next) {
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
			const {
				content,
				abstract,
				title
			} = fields;
			try {
				if (!title) {
					throw new Error('没标题')
				} else if (!abstract) {
					throw new Error('没概括')
				} else if (!content) {
					throw new Error('没内容')
				} else {
					try {
						const titles = await ArticleModel.findOne({
							title: title
						});
						if (titles) {
							res.send({
								status: 0,
								type: 'GET_ERROR_PARAM',
								message: '标题重复',
							});
						} else {
							try {
								const articleDetail = {
									"content": content,
									"abstract": abstract,
									"title": title
								}
								const newArticle = new ArticleModel(articleDetail);
								await newArticle.save();
								res.send({
									status: 0,
									type: 'GET_ERROR_PARAM',
									message: '添加成功'
								})
							} catch (err) {
								res.send({
									status: 0,
									type: 'GET_ERROR_PARAM',
									message: '添加失败'
								});
							}
						}
					} catch (err) {
						res.send({
							status: 0,
							type: 'GET_ERROR_PARAM',
							message: '添加失败'
						});
					}
				}
			} catch (err) {
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
			}

		})
	}
}

export default new Article()