<template>
    <Card title="新建群组" class="card-wrapper">
        <Button slot="extra" type="primary" @click="goBack" style="margin-top:-5px;">返回列表</Button>
        <div class="body-wrapper">
            <div class="step-wrapper">
                <Steps :current="curStep">
                    <Step title="第一步" content="创建群组信息"></Step>
                    <Step title="第二步" content="选择机器人"></Step>
                    <Step title="第三步" content="添加好友"></Step>
                    <Step title="第四步" content="创建入群策略"></Step>
                </Steps>
            </div>
            <!-- 第一步 -->
            <Row class="body-content" v-show="curStep==0" style="overflow:auto">
                <Col :sm="24" :md="20" :lg="12">
                <Form ref="formOne" :model="dataSet.oneStep" label-position="right" :label-width="130">
                    <FormItem label="群组名称" prop="name" :rules="{required:true,message:'群组名称必填'}">
                        <Input v-model="dataSet.oneStep.name" />
                    </FormItem>
                    <FormItem label="好友标签设置" prop="tagName" :rules="{required:true,message:'好友标签设置必填'}">
                        <Input v-model="dataSet.oneStep.tagName" />
                    </FormItem>
                    <FormItem label="打招呼用语" prop="vcHelloWord" :rules="{required:true,message:'打招呼用语必填'}">
                        <Input v-model="dataSet.oneStep.vcHelloWord" maxlength="33" show-word-limit />
                    </FormItem>
                    <FormItem label="添加后自动回复" prop="chatRoomMsgContent" :rules="{required:true,message:'添加后自动回复必填'}">
                        <Input v-model="dataSet.oneStep.chatRoomMsgContent" type="textarea" />
                    </FormItem>
                    <FormItem label="">
                        <RadioGroup v-model="dataSet.oneStep.radio">
                            <Radio :label="1">自动发送入群邀请</Radio>
                            <Radio :label="2">自动发送班主任微信</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="班主任微信序列号">
                        <Input v-model="dataSet.oneStep.adminVcRobotSerialNo" />
                        <a href="https://shimo.im/sheets/GG6hqrkjtG6TJpvT/MODOC" target="_blank">查看石墨文档</a>
                    </FormItem>
                    <!-- <FormItem label="自动回复设置" prop="autoReplyMsg" :rules="{required:true,message:'自动回复设置必填'}">
                        <Input v-model="dataSet.oneStep.autoReplyMsg" type="textarea" />
                    </FormItem> -->
                    <FormItem label="最大入群人数" prop="maxMember" :rules="{required:true,message:'最大入群人数必填'}">
                        <InputNumber v-model="dataSet.oneStep.maxMember" style="width:200px" placeholder="请输入100～350之间的数字"></InputNumber>
                    </FormItem>
                </Form>
                </Col>
            </Row>

            <!-- 第二步 -->
            <div ref="bodyContent" class="body-content" v-if="curStep==1" style="overflow:hidden">
                <div ref="tableTop">
                    <p style="padding: 0 20px">最大闲置机器人数量：{{dataSet.twoStep.freeRobotNum}}个（如果数量不够请先返回列表页，停止正在生效的群组策略）</p>
                    <div class="two-search-wrapper">
                        <p style="width:180px">根据历史群组选择机器人</p>
                        <!-- <Input v-model="dataSet.twoStep.search" suffix="ios-search" style="width:240px" /> -->
                        <fuzzy-search v-model="dataSet.twoStep.search" searchBtn url="/group/getHistoryGroupList" add @add="selectRobot" style="width:300px"></fuzzy-search>
                    </div>
                    <Tag color="blue" style="margin-left:auto">最多选择100个，已选择{{dataSet.twoStep.selectedNum}}个</Tag>
                </div>
                <Table ref="pageTwoTable" :columns="dataSet.twoStep.tableColemn" :height="tableHeight" :data="dataSet.twoStep.list" :loading="dataSet.twoStep.tableSpin" @on-selection-change="selectedRowPageTwo" border></Table>
            </div>

            <!-- 第三步 -->
            <div ref="bodyContent" class="body-content" v-if="curStep==2" style="overflow:hidden">
                <div style="height:60px">
                    <strong>1、已经将{{dataSet.thirdStep.robotNum}}个机器人昵称更改完毕，批量添加机器人为好友 <Button type="primary" @click="dataSet.thirdStep.addFriendsModal=true" size="small">添加好友</Button> 批量添加好友预计最长需要{{dataSet.thirdStep.robotNum*2}}分钟</strong>
                </div>

                <Table :columns="dataSet.thirdStep.tableColemn" :data="dataSet.thirdStep.list" :height="tableHeight" width="400" border></Table>

                <div style="height:60px;margin-top:16px">
                    <strong style="color:red">2、点击下一步前，请确认机器人和运营号是好友关系 <Button type="primary" @click="lookFriendProcess" size="small">查看好友添加进度</Button></strong>
                </div>
            </div>

            <!-- 第四步 -->
            <div ref="bodyContent" class="body-content" v-if="curStep==3" style="overflow:hidden">
                <div ref="tableTop">
                    <p>将机器人拉入群后，左侧列表就会显示群聊名称，将群添加至右侧列表内</p>
                    <span style="color:red">注意：保证右侧每个群内的机器人必须完全一致</span><Button type="primary" @click="lookRobotStatus" size="small">查看机器人入群情况</Button>
                    <br><br>
                    <div style="display:flex;align-items:center;margin-bottom:10px;">
                        最大入群人数：{{dataSet.fourthStep.maxNum}}人。<span style="color:red;font-size:12px">（当一个群的群人数大于此人数时，机器人会向下一个群拉人）</span>
                    </div>
                </div>

                <Row>
                    <Col :xs="24" :sm="10" :md="10" :lg="8">
                    <Table :columns="dataSet.fourthStep.leftTableColemn" :data="dataSet.fourthStep.leftList" :height="tableHeight" :loading="dataSet.fourthStep.leftLoading" border>
                        <template slot-scope="{ row, index }" slot="fourthLeftAction">
                            <Button v-if="row.chatRoomStatus===0" type="primary" size="small" @click="addGroup(row,index)">添加</Button>
                            <span v-else>已添加</span>
                        </template>
                    </Table>
                    </Col>
                    <Col :xs="24" :sm="4" :md="4" :lg="2" :style="{height:`${tableHeight}px`}" style="display:flex;align-items:center;justify-content:center">
                    <Icon type="md-arrow-round-forward" style="padding: 0 20px;font-size:24px" />
                    </Col>
                    <Col :xs="24" :sm="10" :md="10" :lg="8">
                    <Table :columns="dataSet.fourthStep.rightTableColemn" :data="dataSet.fourthStep.rightList" :height="tableHeight" :loading="dataSet.fourthStep.leftLoading" border>
                        <template slot-scope="{ row, index }" slot="fourthRightAction">
                            <Button type="error" size="small" @click="delGroup(row,index)">删除</Button>
                        </template>
                    </Table>
                    </Col>
                </Row>
            </div>
            <div style="margin-top:16px;height:32px">
                <Button v-show="curStep>0" type="primary" @click="pre" style="margin-right:20px;width: 140px">上一步</Button>
                <Button v-show="curStep<3" type="primary" :loading="submitLoading" @click="next" style="width: 140px">下一步</Button>
                <Button v-show="curStep==3" type="primary" :loading="submitLoading" @click="next">确定</Button>
            </div>
        </div>

        <!-- 添加好友弹窗 -->
        <Modal v-model="dataSet.thirdStep.addFriendsModal" footer-hide title="添加好友">
            <p style="font-size:14px"><strong>条件一：</strong>运营号与机器人不是好友关系，需要重新添加好友；<span style="color:red">注：每个运营的微信号被动添加好友数量为100个，同时机器人添加好友会占用每日投放添加好友资源数量（每日3个）请谨慎使用！！！</span></p>
            <p style="font-size:14px;margin-bottom:20px;"><strong>条件二：</strong>运营号与机器人已是好友关系，<span style="color:red">仍旧要填写号码</span>，但是不会占用机器人每日的好友添加次数，可在查看添加进度中，检验好友关系</p>
            <Input v-model="dataSet.thirdStep.relationNum" placeholder="请输入手机号码/微信号码" />
            <div style="margin-top:16px;text-align:center">
                <Button @click="dataSet.thirdStep.addFriendsModal=false" style="margin-right:20px">取消</Button>
                <Button type="primary" :loading="dataSet.thirdStep.beginAddLoading" @click="addFriends">开始添加</Button>
            </div>
        </Modal>
        <!-- 查看好友添加进度 -->
        <Modal v-model="dataSet.thirdStep.lookStatus" footer-hide title="查看好友进度">
            <p style="font-size:14px;color:red">1、本次添加过程预计{{dataSet.thirdStep.robotNum*2}}分钟结束，在此时间之前，请不要点击更换机器人；如果此时间之后仍旧有机器人未添加成功，可点击更换机器人，重新添加好友；</p>
            <p style="font-size:14px;color:red">2、每次更换机器人后，请等待（更换机器人数量*2）分钟后，再确认好友状态；</p>
            <p style="font-size:14px;color:red">3、如果长时间机器人添加好友失败，则点击 <Button type="primary" @click="changeCrm" size="small" style="color:#FFFFFF">更换机器人</Button> 更换机器人，保存已选机器人</p>
            <Table :columns="dataSet.thirdStep.tableColemn2" :data="dataSet.thirdStep.list2" border></Table>
            <div style="margin-top:16px;text-align:center">
                <Button @click="dataSet.thirdStep.lookStatus=false" style="margin-right:20px">关闭</Button>
            </div>
        </Modal>
        <!-- 机器人入群情况 -->
        <Modal v-model="dataSet.fourthStep.crmInModal" footer-hide title="查看机器人入群情况">
            <div style="display:flex;align-items:center;margin-bottom:10px">
                <span>选择微信群</span>
                <Select v-model="dataSet.fourthStep.curWXQ" @on-change="_searchRobotProcess" style="width:200px;margin-left:10px">
                    <Option v-for="item in dataSet.fourthStep.WXQList" :key="item.id" :value="item.vcChatRoomSerialNo">{{item.vcChatRoomName}}</Option>
                </Select>
            </div>
            <div style="display:flex">
                <Table :columns="dataSet.fourthStep.tableColemn" :data="dataSet.fourthStep.list" border width="300" style="margin-right:20px"></Table>
                <div>
                    <p style="color:red">注意：如果显示失败，请在群内回复任意消息后，再刷新查看状态。</p>
                    <p>如果<span style="color: red">多次发送入群邀请</span>仍旧失败，请返回机器人选择，重新选择机器人</p>
                    <Button type="primary" @click="reSelectCrm" size="small">重新选择机器人</Button>
                </div>
            </div>

            <div style="margin-top:16px;text-align:center">
                <Button @click="closeRobotStatus" style="margin-right:20px">关闭</Button>
            </div>
        </Modal>
    </Card>
</template>

<script>
import FuzzySearch from './fuzzySearch'
export default {
    components: {
        FuzzySearch
    },
    data() {
        return {
            curGroupId: '',
            curGroupStatus: -1,
            curStep: 0,
            pageType: 'add',
            submitLoading: false,
            dataSet: {
                oneStep: {
                    name: '',
                    tagName: '',
                    vcHelloWord: '',
                    chatRoomMsgContent: '',
                    radio: 1,
                    adminVcRobotSerialNo: '',
                    autoReplyMsg: '',
                    maxMember: 100,
                    recommendTeacher: 0,
                    inviteChatRoom: 0
                },
                twoStep: {
                    search: '',
                    freeRobotNum: 0,
                    selectedNum: 0,
                    selectedGroupMax: false,
                    selectedRows: [],
                    tableColemn: [
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title: '机器人昵称',
                            key: 'vcNickName'
                        },
                        {
                            title: '群组名称',
                            key: 'groupName'
                        },
                        {
                            title: '运营微信号',
                            key: 'vcAccount'
                        }
                    ],
                    list: [],
                    tableSpin: false
                },
                thirdStep: {
                    robotNum: 0,
                    tableColemn: [
                        {
                            title: '机器人昵称',
                            key: 'vcNickName'
                        }
                    ],
                    list: [],
                    addFriendsModal: false,
                    addEd: false,
                    relationNum: '',
                    beginAddLoading: false,
                    lookStatus: false,
                    tableColemn2: [
                        {
                            title: '机器人昵称',
                            key: 'robotNickName'
                        },
                        {
                            title: '运营微信号',
                            key: 'vcAccount'
                        },
                        {
                            title: '添加好友状态',
                            render: (h, params) => {
                                return h('span', {}, (params.row.status === 1 || params.row.status === 4) ? '等待' : (params.row.status === 2 ? '成功' : '失败'))
                            }
                        }
                    ],
                    list2: [],
                },
                fourthStep: {
                    crmInModal: false,
                    curWXQ: '',
                    WXQList: [],
                    maxNum: null,
                    leftLoading: false,
                    leftTableColemn: [
                        {
                            title: '群名称',
                            key: 'vcName',
                        },
                        {
                            title: '操作',
                            width: 80,
                            slot: 'fourthLeftAction'
                        }
                    ],
                    rightTableColemn: [
                        {
                            type: 'index',
                            width: 60,
                            title: '排序',
                            align: 'center'
                        },
                        {
                            title: '群名称',
                            key: 'vcChatRoomName',
                        },
                        {
                            title: '操作',
                            width: 80,
                            slot: 'fourthRightAction'
                        }
                    ],
                    leftList: [],
                    rightList: [],
                    tableColemn: [
                        {
                            title: '机器人昵称',
                            key: 'vcNickName'
                        },
                        {
                            title: '入群状态',
                            width: 100,
                            render: (h, params) => {
                                return h('span', {}, params.row.inChatRoomStatus == 0 ? '等待' : (params.row.inChatRoomStatus === 1 ? '成功' : '失败'))
                            }
                        }
                    ],
                    list: []
                }
            },
            tableHeight: 0,
            addFriendsModal: false
        }
    },
    created() {
        this.curGroupId = this.$route.query.id || ''
        this.curGroupStatus = this.$route.query.status || ''
        if (this.curGroupId) {
            this.pageType = 'edit'
            this._initOne()
        }
        this.$Message.config({
            duration: 3
        });
    },
    mounted() {
        window.onresize = this.setTableHeight
    },
    destroyed() {
        window.onresize = null
    },
    watch: {
        curStep(val) {
            if (val === 0) {
                this._initOne()
            }
            if (val === 1) {
                this._initTwo()
            }
            if (val === 2) {
                this._initThree()
            }
            if (val === 3) {
                this._initFour()
            }
            this.$nextTick(() => {
                if (val > 0) {
                    this.setTableHeight()
                }
            })
        }
    },
    methods: {
        goBack() {
            this.$router.push('/group/list')
        },
        next() {
            if (this.curStep === 0) {
                return this._submitOne()
            }
            if (this.curStep === 1) {
                return this._submitTwo()
            }
            if (this.curStep === 2) {
                return this._submitThree()
            }
            if (this.curStep === 3) {
                return this._submitFour()
            }
        },
        pre(step) {
            this.curStep--
        },
        setTableHeight() {
            if (this.curStep === 0) return
            let bodyHeight = this.$refs.bodyContent.offsetHeight
            this.$nextTick(() => {
                if (this.curStep === 1 || this.curStep === 3) {
                    let tableTopHeight = this.$refs.tableTop.offsetHeight
                    this.tableHeight = bodyHeight - tableTopHeight - 10
                }
                if (this.curStep === 2) {
                    this.tableHeight = bodyHeight - 136
                }
            })
            console.log(bodyHeight, this.tableHeight)
        },
        // 第二步
        selectRobot(item) {
            this.$http.get(`/group/getHistoryRobotsByGroupId?groupId=${item.value}`).then(res => {
                if (res.data.list && res.data.list.length > 0) {
                    this._selectRobot(res.data.list)
                } else {
                    this.$Message.info('当前群组内无可用机器人')
                }
            }).catch(err => { })
        },
        selectedRowPageTwo(selected) {
            this.dataSet.twoStep.selectedNum = selected.length
            let dif = this._getArrDifferent(selected, this.dataSet.twoStep.selectedRows)

            if (selected.length > this.dataSet.twoStep.selectedRows.length) {
                dif.forEach(d => {
                    this.dataSet.twoStep.list.find(item => item.vcRobotSerialNo === d)._checked = true
                })
            } else {
                dif.forEach(d => {
                    this.dataSet.twoStep.list.find(item => item.vcRobotSerialNo === d)._checked = false
                })
            }
            this.dataSet.twoStep.selectedRows = selected
            this.maxSelect(selected)
        },
        maxSelect(selected) {
            if (selected.length >= 100) {
                this.dataSet.twoStep.selectedGroupMax = true
                this.dataSet.twoStep.list = this.dataSet.twoStep.list.map(item => {
                    if (selected.findIndex(a => a.vcRobotSerialNo === item.vcRobotSerialNo) !== -1) {
                        return { ...item, _disabled: false, _checked: true }
                    } else {
                        return { ...item, _disabled: true, _checked: false }
                    }
                })
            } else {
                if (!this.dataSet.twoStep.selectedGroupMax) return
                this.dataSet.twoStep.selectedGroupMax = false
                this.dataSet.twoStep.list = this.dataSet.twoStep.list.map(item => {
                    if (selected.findIndex(a => a.vcRobotSerialNo === item.vcRobotSerialNo) !== -1) {
                        return { ...item, _disabled: false, _checked: true }
                    } else {
                        return { ...item, _disabled: false, _checked: false }
                    }
                })
            }
        },
        // 第三步
        addFriends() {
            if (!this.dataSet.thirdStep.relationNum) return this.$Message.info({ content: '请输入正确的手机号码/微信号码', duration: 3 })
            this.dataSet.thirdStep.beginAddLoading = true
            this.$http.post({
                url: 'group/addInnerFriend',
                data: {
                    groupId: this.curGroupId,
                    vcAccount: this.dataSet.thirdStep.relationNum
                }
            }).then(res => {
                this.$Message.info(res.msg)
                this.dataSet.thirdStep.beginAddLoading = false
                this.dataSet.thirdStep.addFriendsModal = false
            }).catch(err => {
                this.dataSet.thirdStep.beginAddLoading = false
            })
        },
        lookFriendProcess() {
            this.dataSet.thirdStep.lookStatus = true
            this.$http.get(`/group/getAddFrientProgress?groupId=${this.curGroupId}`).then(res => {
                if (res.data.list && res.data.list.length > 0) {
                    this.dataSet.thirdStep.list2 = res.data.list
                } else {
                    this.dataSet.thirdStep.list2 = []
                }
            }).catch(err => { })
        },
        // 第四步
        lookRobotStatus() {
            if (this.dataSet.fourthStep.curWXQ) {
                this._searchRobotProcess()
            }
            this.dataSet.fourthStep.crmInModal = true
            this.$http.get(`/chatRoom/getChatRoomsByGroupId?groupId=${this.curGroupId}`).then(res => {
                if (res.data.list && res.data.list.length > 0) {
                    this.dataSet.fourthStep.WXQList = res.data.list
                }
            }).catch(err => { })
        },
        closeRobotStatus() {
            this.dataSet.fourthStep.crmInModal = false
            this.dataSet.fourthStep.list = []
        },
        _searchRobotProcess(val) {
            if (!this.dataSet.fourthStep.curWXQ) return
            this.$http.get(`/chatRoom/getRobotEnterGroupStatus?groupId=${this.curGroupId}&vcChatRoomSerialNo=${this.dataSet.fourthStep.curWXQ}`).then(res => {
                if (res.data.list && res.data.list.length > 0) {
                    this.dataSet.fourthStep.list = res.data.list
                }
            })
        },
        changeCrm() {
            this.dataSet.thirdStep.lookStatus = false
            this.curStep = 1
        },
        reSelectCrm() {
            this.dataSet.fourthStep.crmInModal = false
            this.curStep = 1
        },
        addGroup(row, index) {
            this.$http.post({
                url: '/chatRoom/addChatRoom',
                data: {
                    vcChatRoomName: row.vcName,
                    vcChatRoomSerialNo: row.vcChatRoomSerialNo,
                    maxMember: this.dataSet.fourthStep.maxNum,
                    groupId: this.curGroupId
                }
            }).then(res => {
                this._initFour()
            })
        },
        delGroup(row, index) {
            this.$http.get(`/chatRoom/deleteChatRoom?id=${row.id}&groupId=${this.curGroupId}`).then(res => {
                this._initFour()
            })
        },
        backList() {
            this.$router.push('/group/list')
        },
        _submitOne() { // dataSet.oneStep
            let valid = this._validateOne()
            if (valid) {
                let data = JSON.parse(JSON.stringify(this.dataSet.oneStep))
                if (data.radio === 1) data.inviteChatRoom = 1
                else data.recommendTeacher = 1
                delete data.radio
                let url = ''
                if (this.pageType === 'add') {
                    url = '/group/addGroup'
                } else {
                    url = '/group/updateGroup'
                    data.id = this.curGroupId
                }
                this.submitLoading = true
                this.$http.post({
                    url: url,
                    data: data
                }).then(res => {
                    if (this.pageType === 'add') {
                        this.curGroupId = res.data.id
                        this.pageType = 'edit'
                    }
                    this.curStep++
                    this.submitLoading = false
                }).catch(err => {
                    // this.$Message.info(err.msg || '失败')
                    this.submitLoading = false
                })
            }
        },
        _submitTwo() {
            let rsns = this.$refs.pageTwoTable.getSelection().map(m => m.vcRobotSerialNo).join(',')
            if (!rsns) return this.$Message.info('当前没有添加机器人，请选择后再提交')
            this.submitLoading = true
            this.$http.post({
                url: '/group/addRobotToGroup',
                data: {
                    vcRobotSerialNos: rsns,
                    groupId: this.curGroupId
                }
            }).then(res => {
                this.$Message.info(res.msg)
                this.submitLoading = false
                this.curStep++
            }).catch(err => { this.submitLoading = false })

        },
        _submitThree() {
            this.submitLoading = true
            if (this.dataSet.thirdStep.list2.length > 0) {
                this.curStep++
                this.submitLoading = false
            } else {
                this.$http.get(`/group/getAddFrientProgress?groupId=${this.curGroupId}`).then(res => {
                    if (res.data.list && res.data.list.length > 0) {
                        this.curStep++
                        this.submitLoading = false
                    } else {
                        this.$Message.info('群组没有设置运营微信号')
                        this.submitLoading = false
                    }
                }).catch(err => {
                    this.submitLoading = false
                })
            }
        },
        _submitFour() {
            if (this.dataSet.fourthStep.rightList.length <= 0) return this.$Message.info('您还没有添加群')
            // if (this.curGroupStatus === 1 || this.curGroupStatus === 2) {
            //     this.submitLoading = true
            //     this.$http.get(`/group/commitChatRooms?groupId=${this.curGroupId}`).then(res => {
            //         this.$Message.success(res.msg)
            //         this.submitLoading = false
            //         this.$router.push('/group/list')
            //     }).catch(err => {
            //         this.submitLoading = false
            //     })
            // } else {
            //     this.$router.push('/group/list')
            // }
            this.submitLoading = true
            this.$http.get(`/group/commitChatRooms?groupId=${this.curGroupId}`).then(res => {
                this.$Message.success(res.msg)
                this.submitLoading = false
                this.$router.push('/group/list')
            }).catch(err => {
                this.submitLoading = false
            })
        },
        _initOne() {
            this.$http.get(`/group/getGroupById?id=${this.curGroupId}`).then(res => {
                if (res.data.data) {
                    if (res.data.data.recommendTeacher == 1) {
                        res.data.data.radio = 2
                    } else {
                        res.data.data.radio = 1
                    }
                    this.dataSet.oneStep = {
                        name: res.data.data.name,
                        tagName: res.data.data.tagName || '',
                        vcHelloWord: res.data.data.vcHelloWord || '',
                        chatRoomMsgContent: res.data.data.chatRoomMsgContent || '',
                        radio: res.data.data.radio,
                        adminVcRobotSerialNo: res.data.data.adminVcRobotSerialNo || '',
                        autoReplyMsg: res.data.data.autoReplyMsg || '',
                        maxMember: res.data.data.maxMember || null,
                        recommendTeacher: res.data.data.recommendTeacher || 0,
                        inviteChatRoom: res.data.data.inviteChatRoom || 0
                    }
                }
            }).catch(err => { })
        },
        _initTwo() {
            this.dataSet.twoStep.selectedRows = []
            this.dataSet.twoStep.list = []
            this.dataSet.twoStep.tableSpin = true
            this.$http.get(`/group/getIdleRobotList?groupId=${this.curGroupId}`).then(res => {
                if (res.data.list && res.data.list.length > 0) {
                    let selectnum = 0, freenum = 0;
                    for (let i = 0; i < res.data.list.length; i++) {
                        const item = res.data.list[i];
                        if (!item.vcNickName) continue;
                        if (item.checked) {
                            this.dataSet.twoStep.selectedRows.push(item)
                            selectnum++
                            this.dataSet.twoStep.list.unshift({
                                groupId: item.groupId,
                                vcRobotSerialNo: item.vcRobotSerialNo,
                                vcNickName: item.vcNickName,
                                groupName: item.groupName,
                                vcAccount: item.vcAccount,
                                _checked: item.checked
                            })
                        } else {
                            freenum++
                            this.dataSet.twoStep.list.push({
                                groupId: item.groupId,
                                vcRobotSerialNo: item.vcRobotSerialNo,
                                vcNickName: item.vcNickName,
                                groupName: item.groupName,
                                vcAccount: item.vcAccount,
                                _checked: item.checked
                            })
                        }
                    }
                    this.maxSelect(this.dataSet.twoStep.selectedRows)
                    this.dataSet.twoStep.selectedNum = selectnum
                    this.dataSet.twoStep.freeRobotNum = freenum
                    this.dataSet.twoStep.totalNum = res.data.totalCount
                }
                this.dataSet.twoStep.tableSpin = false
            }).catch(err => { this.dataSet.twoStep.tableSpin = false })
        },
        _initThree() {
            this.$http.get(`/group/getRobotNickNameByGroupId?groupId=${this.curGroupId}`).then(res => {
                if (res.data.list && res.data.list.length > 0) {
                    this.dataSet.thirdStep.list = res.data.list
                    this.dataSet.thirdStep.robotNum = res.data.totalCount
                }
            }).catch(err => { })
        },
        _initFour() {
            this.dataSet.fourthStep.leftLoading = true
            this.$http.get(`/chatRoom/getChatRoomList?groupId=${this.curGroupId}`).then(res => {
                if (res.data.allList && res.data.allList.length > 0) {
                    this.dataSet.fourthStep.leftList = res.data.allList
                    this.dataSet.fourthStep.rightList = res.data.selectList
                }
                this.dataSet.fourthStep.maxNum = res.data.maxMember || 0
                this.dataSet.fourthStep.leftLoading = false
            }).catch(err => { this.dataSet.fourthStep.leftLoading = false })
        },
        // 点击下拉框点击添加时候执行
        _selectRobot(list) {
            let flag = false
            list.forEach(rsn => {
                let row = this.dataSet.twoStep.list.find(i => i.vcRobotSerialNo === rsn)
                // console.log(this.dataSet.twoStep.selectedRows, row.vcRobotSerialNo)
                if (row) {
                    row._checked = true
                    flag = true
                    if (this.dataSet.twoStep.selectedRows.findIndex(item => item.vcRobotSerialNo === row.vcRobotSerialNo) == -1) {
                        // 如果已选择机器人列表里没有，就加进去
                        this.dataSet.twoStep.selectedRows.push(row)
                        this.dataSet.twoStep.selectedNum++
                    }
                }
            })

            if (flag) {
                this.$Message.info({
                    content: '添加成功',
                    duration: 1.5
                })
            } else {
                this.$Message.info({
                    content: '已被其他群组占用',
                    duration: 1.5
                })
            }
        },
        // 验证第一步表单提交
        _validateOne() {
            if (!this.dataSet.oneStep.name) {
                this.$Message.info('群组名称必填')
                return false
            }
            if (!this.dataSet.oneStep.tagName) {
                this.$Message.info('好友标签必填')
                return false
            }
            if (!this.dataSet.oneStep.vcHelloWord) {
                this.$Message.info('打招呼用语必填')
                return false
            }
            if (!this.dataSet.oneStep.chatRoomMsgContent) {
                this.$Message.info('添加后的自动回复必填')
                return false
            }
            // if (!this.dataSet.oneStep.adminVcRobotSerialNo) {
            //     this.$Message.info('班主任序列号必填')
            //     return false
            // }
            // if (!this.dataSet.oneStep.autoReplyMsg) {
            //     this.$Message.info('自动回复必填')
            //     return false
            // }
            if (this.dataSet.oneStep.maxMember < 100 || this.dataSet.oneStep.maxMember > 350) {
                this.$Message.info('入群人数必须在100～350之间')
                return false
            }
            return true
        },
        _getArrDifferent(arr1, arr2) {
            // 待优化
            let arr = arr1.concat(arr2)
            // 序列号的组合
            let serialNoArr = []
            arr.forEach(a => { serialNoArr.push(a.vcRobotSerialNo) })
            // sList两个数组的差集的序列号
            let sList = serialNoArr.filter((a, i, arr) => arr.indexOf(a) === arr.lastIndexOf(a))
            return sList
        }
    },
}
</script>
<style scoped>
.step-wrapper {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 16px;
    margin-bottom: 16px;
    height: 61px;
}
.two-search-wrapper {
    display: flex;
    align-items: center;
    padding: 20px;
}
.card-wrapper {
    height: 100%;
}
.card-wrapper /deep/ .ivu-card-body {
    height: calc(100% - 51px);
}
.body-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.body-content {
    flex: 1;
    /* overflow: auto; */
}
.body-content >>> thead .ivu-checkbox-wrapper {
    display: none;
}
.form-content::after {
    content: " ";
    position: absolute;
    bottom: 0;
    left: 32px;
    right: 200px;
    height: 1px;
    background: -webkit-linear-gradient(left, #fff -4%, #c7c9d0 30%, #c7c9d0 70%, #fff 100%);
}
</style>