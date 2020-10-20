/**
 *
 * @param barrageContainer 父容器dmo
 * @param barrageItemBox 每个
 */
export default function barrage({ barrageContainer, barrageItemBox }) {
    if (barrageContainer == undefined || barrageItemBox == undefined) {
        console.error("缺少必传参数barrageContainer和barrageItemBox");
        return false;
    }
    Object.assign(barrageContainer.style, {
        "pointer-events": "none",
    });
    let mouseEnterTimeT = 0;
    let currentItem;
    let isMousedown = false;
    document.documentElement.addEventListener("mousedown", function (event) {
        isMousedown = true;
        clearTimeout(mouseEnterTimeT);
    });
    document.documentElement.addEventListener("mouseup", function (event) {
        isMousedown = false;
    });
    document.documentElement.addEventListener("mousemove", function (event) {
        const { x, y } = event;
        let currentBarrageItem = Array.from(barrageItems).find((barrageItem) => {
            const { top, left, width, height } = barrageItem.getBoundingClientRect();
            return x >= left && x <= left + width && y >= top && y <= top + height;
        });
        if (currentItem !== currentBarrageItem) {
            currentItem = currentBarrageItem;
            clearTimeout(mouseEnterTimeT);
            Object.assign(barrageContainer.style, {
                "pointer-events": "none",
            });
            if (currentBarrageItem && !isMousedown) {
                // 滑上会有300毫秒的延迟
                mouseEnterTimeT = setTimeout(() => {
                    Object.assign(barrageContainer.style, {
                        "pointer-events": "unset",
                    });
                }, 300);
            }
        }
    });
    // 容器的宽高
    const containerWidth = barrageContainer.offsetWidth;
    const containerHeight = barrageContainer.offsetHeight;
    //   const barrageItems = barrageContainer.getElementsByClassName("barrage-item");
    const barrageItems = barrageContainer.getElementsByClassName(barrageItemBox);

    function addBarrageItem(content = "", events = {}) {
        content.style.display = "block"; // 传递来的dom默认是隐藏的，一定要block
        let barrageItem = content;
        barrageContainer.appendChild(barrageItem);
        const items = Array.from(barrageItems).filter((item) => {
            return item !== barrageItem;
        });
        const lastItems = getLastItems(items);
        // 获取到需要设置的位置信息
        const { top, right } = getInsertPos(lastItems, barrageItem);
        Object.assign(barrageItem.style, {
            right: right + "px",
            top: top + "px",
        });
        const duration = (containerWidth - right) * 10; // 动画时间
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate
        const animate = barrageItem.animate(
            [{
                right: right + "px",
            },
            {
                right: containerWidth + "px",
            },
            ], {
            duration,
            fill: "forwards",
        }
        );
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Animation
        animate.onfinish = function () {
            // Node.contains()返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。
            if (!barrageItem.classList.contains("barrage-pause")) {
                barrageContainer.contains(barrageItem) &&
                    barrageContainer.removeChild(barrageItem);
            }
        };
        let running = false;
        let startPauseTime = 0;
        barrageItem.addEventListener("mouseenter", function () {
            Object.assign(barrageItem.style, {
                left: barrageItem.offsetLeft + "px",
                width: window.getComputedStyle(barrageItem).width,
            });
            barrageItem.classList.add("barrage-pause");
            startPauseTime = animate.currentTime;
            running = true;
        });
        barrageItem.addEventListener("mouseleave", function () {
            if (running) {
                running = false;
                const translateX =
                    ((containerWidth - right) / duration) *
                    (animate.currentTime - startPauseTime);
                Object.assign(barrageItem.style, {
                    transform: `translateX(${translateX}px)`,
                });
                // eslint-disable-next-line no-unused-expressions
                barrageItem.clientWidth;
                Object.assign(barrageItem.style, {
                    transform: `translateX(0px)`,
                    transition: "transform 0.2s",
                });
                Object.assign(barrageItem.style, {
                    left: "unset",
                });
                barrageItem.classList.remove("barrage-pause");
            }
            if (animate.playState === "finished") {
                barrageContainer.removeChild(barrageItem);
            }
        });
        barrageItem.addEventListener("transitionend", function () {
            Object.assign(barrageItem.style, {
                transform: `unset`,
                transition: "unset",
            });
        });
        Object.entries(events).forEach(([event, cb]) => {
            barrageItem.addEventListener(event, cb);
        });
    }

    function clearBarrageItem() {
        barrageContainer.innerHTML = "";
    }
    // 每一行的最后一个元素,按照从上往下放入数组
    function getLastItems(items) {
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        const hash = items.reduce((result, curr) => {
            // 返回{}的最后一个元素的数据格式
            const top = curr.offsetTop;
            result[top] = curr;
            return result;
        }, {});
        const keys = Object.keys(hash).sort((a, b) => a - b); // 确保排序小到大
        return keys.map((key) => hash[key]); // 返回每一行最后的一个元素，返回[]
    }
    // 获取该插入的位置
    function getInsertPos(lastItems, barrageItem) {
        if (!lastItems.length) {
            return {
                top: 0,
                right: -barrageItem.offsetWidth,
            };
        }
        for (let i = 0, len = lastItems.length; i < len; i++) {
            const lastItem = lastItems[i];
            // 获取当前行上一个元素的位置，是否超出了容器宽度
            // rightLen >= 0 未超出 把当前元素添加到当前行
            const rightLen = getRightLen(lastItem);
            if (rightLen >= 0) {
                return {
                    top: lastItem.offsetTop,
                    right: -barrageItem.offsetWidth,
                };
            }
        }
        // 弹幕超出当前容器行了  另起一行展示
        const lowestLastItem = lastItems[lastItems.length - 1];
        const lowestBottomLen = getBottomLen(lowestLastItem);
        if (lowestBottomLen + barrageItem.offsetHeight <= containerHeight) {
            return {
                top: lowestBottomLen,
                right: -barrageItem.offsetWidth,
            };
        } else { // 弹幕超出容器高度 -> 获取当前距离顶部最近的弹幕元素
            const nearestLastItem = lastItems.sort((a, b) => {
                return getRightLen(b) - getRightLen(a);
            })[0];
            return {
                top: nearestLastItem.offsetTop,
                right: getRightLen(nearestLastItem) - barrageItem.offsetWidth,
            };
        }
    }

    function getRightLen(barrageItem) { // 获取元素的right位置
        return containerWidth - (barrageItem.offsetLeft + barrageItem.offsetWidth);
    }

    function getBottomLen(barrageItem) { // 获取元素top位置
        return barrageItem.offsetTop + barrageItem.offsetHeight;
    }
    return {
        addBarrageItem,
        clearBarrageItem,
    };
}