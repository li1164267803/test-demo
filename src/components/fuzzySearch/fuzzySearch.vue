<template>
    <div class="wrapper" v-clickoutside='_leaveInp'>
        <Input :value="value" @input="_inp" class="inp-dom" @on-focus="_onFocus" :suffix="iconType" />
        <transition name="fade">
            <div v-show="value&&inpFocus" class="inp-select-dropdown">
                <ul>
                    <li v-show="optionList.length>0" v-for="(item,index) in optionList" :key="index" :value="item.value" @click="selectVal(item)">
                        {{item.label}}
                        <span v-if="add" style="padding: 0 20px;color:#999999;font-size:12px;">机器人数量：{{item.robotNums}}；生效时间：{{item.effectTime}}</span>

                        <template v-if="add">
                            <Button type="primary" size="small" @click.stop="_add(item)">添加</Button>
                        </template>
                    </li>
                    <li v-show="optionList.length<=0" class="no-data">无匹配数据</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        searchBtn: {
            type: Boolean,
            default: false
        },
        add: {
            type: Boolean,
            default: false
        }
    },
    directives: {  // 自定义事件
        clickoutside: {
            bind: function (el, binding, vnode) {
                function documentHandler(e) {
                    if (el.contains(e.target)) {
                        return false;
                    }
                    if (binding.expression) {
                        binding.value(e)
                    }
                }
                el._vueClickOutside_ = documentHandler;
                document.addEventListener('click', documentHandler);
            },
            unbind: function (el, binding) {
                document.removeEventListener('click', el._vueClickOutside_);
                delete el._vueClickOutside_;
            }
        }
    },
    computed: {
        iconType() {
            return this.searchBtn ? 'ios-search' : ''
        }
    },
    data() {
        return {
            inpFocus: false,
            copyVal: '',
            loading: false,
            optionList: [],
            timer: null
        }
    },
    methods: {
        _add(data) {
            this.$emit('add', data)
        },
        _inp(val) {
            this.$emit('input', val)
            this._getOption(val)
        },
        _getOption(query) {
            if (query === '') {
                this.optionList = []
                return
            }
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                if (!this.url) return this.optionList = []
                this.$http.get(`${this.url}?groupName=${query}`).then(res => {
                    if (res.data.list && res.data.list.length > 0) {
                        this.optionList = res.data.list.map(item => {
                            return {
                                label: item.name,
                                value: item.id,
                                effectTime: item.effectTime,
                                robotNums: item.robotNums
                            }
                        })
                    } else {
                        this.optionList = []
                    }
                    // this.optionList = res.data.list || []
                })
            }, 500);
        },
        _onFocus() {
            this.inpFocus = true
            if (this.value) this._getOption(this.value)
        },
        _leaveInp() {
            this.inpFocus = false
        },
        selectVal(item) {
            // let val = e.target.getAttribute('value')
            this.$emit('input', item.label)
            this._getOption(item.label)
        }
    },
}
</script>
<style scoped>
.wrapper {
    /* display: inline-block; */
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    color: #515a6e;
    font-size: 14px;
    line-height: normal;
    position: relative;
    display: flex;
}
.inp-dom {
    position: relative;
}
.inp-select-dropdown {
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 900;
    min-width: 100%;
    position: absolute;
    will-change: top, left;
    transform-origin: center top;
    top: 32px;
    left: 0px;
}
.inp-select-dropdown li {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #515a6e;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.inp-select-dropdown li:hover {
    background: #f3f3f3;
}
.no-data {
    color: #bababa !important;
    text-align: center;
}
</style>