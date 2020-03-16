import Vue from 'vue';
import {
  RadioGroup,
  RadioButton,
  Menu,
  MenuItem,
  Icon,
  Button,
  Message,
  Switch,
} from 'element-ui';

Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Switch);
Vue.prototype.$message = Message;
