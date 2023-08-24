const { User } = require('../models')
const { getEightRandomUsers } = require("../helpers/randomUsersHelper");
const helpers = require('../_helpers')
const likeController = {
  getLikes: async (req, res, next) => {
    const isUser = helpers.getUser(req).id === Number(req.params.id) ? true : false
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (user) {
        const userData = user.toJSON();
        const recommend = await getEightRandomUsers(req);

        const dataToRender = {
          user: userData,
          recommend,
          isUser
        };

        res.render('user/user-likes', dataToRender);
      } else {
        res.status(404).send('未找到用户');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("获取用户数据时出错。");
    }
  }
}

module.exports = likeController