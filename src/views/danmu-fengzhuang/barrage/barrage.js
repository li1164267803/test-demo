export default function barrage({ barrageContainer }) {
  Object.assign(barrageContainer.style, {
    "pointer-events": "none",
  });
  let mouseEnterTimeT = 0;
  let currentItem;
  let isMousedown = false;
  document.documentElement.addEventListener("mousedown", function(event) {
    isMousedown = true;
    clearTimeout(mouseEnterTimeT);
  });
  document.documentElement.addEventListener("mouseup", function(event) {
    isMousedown = false;
  });
  document.documentElement.addEventListener("mousemove", function(event) {
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
        mouseEnterTimeT = setTimeout(() => {
          Object.assign(barrageContainer.style, {
            "pointer-events": "unset",
          });
        }, 300);
      }
    }
  });

  const containerWidth = barrageContainer.offsetWidth;
  const containerHeight = barrageContainer.offsetHeight;
  const barrageItems = barrageContainer.getElementsByClassName("barrage-item");

  function addBarrageItem(content = "", events = {}) {
    const barrageItem = document.createElement("div");
    barrageItem.classList.add("barrage-item");
    if (content instanceof Element) {
      barrageItem.appendChild(content);
    } else {
      barrageItem.innerHTML = content;
    }
    barrageContainer.appendChild(barrageItem);
    const items = Array.from(barrageItems).filter((item) => {
      return item !== barrageItem;
    });
    const lastItems = getLastItems(items);
    const { top, right } = getInsertPos(lastItems, barrageItem);
    Object.assign(barrageItem.style, {
      right: right + "px",
      top: top + "px",
    });
    const duration = (containerWidth - right) * 10;
    const animate = barrageItem.animate(
      [
        {
          right: right + "px",
        },
        {
          right: containerWidth + "px",
        },
      ],
      {
        duration,
        fill: "forwards",
      }
    );
    animate.onfinish = function() {
      if (!barrageItem.classList.contains("barrage-pause")) {
        barrageContainer.contains(barrageItem) &&
          barrageContainer.removeChild(barrageItem);
      }
    };
    let running = false;
    let startPauseTime = 0;
    barrageItem.addEventListener("mouseenter", function() {
      Object.assign(barrageItem.style, {
        left: barrageItem.offsetLeft + "px",
        width: window.getComputedStyle(barrageItem).width,
      });
      barrageItem.classList.add("barrage-pause");
      startPauseTime = animate.currentTime;
      running = true;
    });
    barrageItem.addEventListener("mouseleave", function() {
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
    barrageItem.addEventListener("transitionend", function() {
      Object.assign(barrageItem.style, {
        transform: `unset`,
        transition: "unset",
      });
    });
    // 执行传递过来的事件
    Object.entries(events).forEach(([event, cb]) => {
      barrageItem.addEventListener(event, cb);
    });
  }

  function clearBarrageItem() {
    barrageContainer.innerHTML = "";
  }
  // 每一行的最后一个元素,按照从上往下放入数组
  function getLastItems(items) {
    const hash = items.reduce((result, curr) => {
      const top = curr.offsetTop;
      result[top] = curr;
      return result;
    }, {});
    const keys = Object.keys(hash).sort((a, b) => a - b);
    return keys.map((key) => hash[key]);
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
      const rightLen = getRightLen(lastItem);
      if (rightLen >= 0) {
        return {
          top: lastItem.offsetTop,
          right: -barrageItem.offsetWidth,
        };
      }
    }
    const lowestLastItem = lastItems[lastItems.length - 1];
    const lowestBottomLen = getBottomLen(lowestLastItem);
    if (lowestBottomLen + barrageItem.offsetHeight <= containerHeight) {
      return {
        top: lowestBottomLen,
        right: -barrageItem.offsetWidth,
      };
    }
    const nearestLastItem = lastItems.sort((a, b) => {
      return getRightLen(b) - getRightLen(a);
    })[0];
    return {
      top: nearestLastItem.offsetTop,
      right: getRightLen(nearestLastItem) - barrageItem.offsetWidth,
    };
  }

  function getRightLen(barrageItem) {
    return containerWidth - (barrageItem.offsetLeft + barrageItem.offsetWidth);
  }

  function getBottomLen(barrageItem) {
    return barrageItem.offsetTop + barrageItem.offsetHeight;
  }
  return {
    addBarrageItem,
    clearBarrageItem,
  };
}
