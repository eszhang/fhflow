import React from 'react';
import { Form, Input, Icon, Button} from 'antd';
import '../style/action-setting.scss';
const FormItem = Form.Item;

class ActionSettingForm extends React.Component{
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        // const { form, submitHandler } = this.props;
        // e.preventDefault();
        // form.validateFields((err, values) => {
        //     if (!err) {
        //         submitHandler(values);
        //         message.success('访问主机名更新成功');
        //     }
        // });
    }

    render(){
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem label="工作区路径">
                    <Input placeholder="工作区路径" />
                </FormItem>
            </Form>
        )
    }
}

const WrappedActionSettingForm = Form.create()(ActionSettingForm);

export default class ActionSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render(){
        return (
            <div className="action-setting">
                <WrappedActionSettingForm />
            </div>
        )
    }
}