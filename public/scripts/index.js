// const r = new rive.Rive({
//   src: "../assets/santa.riv",
//   canvas: document.getElementById("canvas"),
//   autoplay: true,
//   onLoad: () => {
//     r.resizeDrawingSurfaceToCanvas();
//   },
// });
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const subId = urlParams.get("subId");
  let inventorySelectedGift = 0;
  let selectedHomeButton = "send";

  const gifts = {
    1001: {
      name: "Мальдивын аялал (хос)",
      image: "../assets/gifts/1001.webp",
    },
    1002: {
      name: "iPhone 15 Pro Max",
      image: "../assets/gifts/1002.webp",
    },
    1003: {
      name: "X Box Series X багц (3 тоглоом, 2 гар)",
      image: "../assets/gifts/1003.webp",
    },
    1004: {
      name: "iPad Air 5",
      image: "../assets/gifts/1004.webp",
    },
    1005: {
      name: "Airpods Pro Max",
      image: "../assets/gifts/1005.webp",
    },
    1006: {
      name: "L20 Ultra robot тоос сорогч",
      image: "../assets/gifts/1006.webp",
    },
    1007: {
      name: "Dyson агаар шүүгч & цэвэршүүлэгч",
      image: "../assets/gifts/1007.webp",
    },
    1008: {
      name: "Dyson Airwrap Олон үйлдэлт үсний стайлер",
      image: "../assets/gifts/1008.webp",
    },
    1009: {
      name: "iWatch s9 41mm ухаалаг цаг",
      image: "../assets/gifts/1009.webp",
    },
    1010: {
      name: "Nomun эрүүл мэндийн ресорт",
      image: "../assets/gifts/1010.webp",
    },
    1011: {
      name: "Intermed эмнэлэг - 2 сая ₮-ийн эрхийн бичиг",
      image: "../assets/gifts/1011.webp",
    },
    1012: {
      name: "Top Motors - 2 сая ₮-ийн эрхийн бичиг",
      image: "../assets/gifts/1012.webp",
    },
    1013: {
      name: "Wellbee shop - 1 сая ₮-ийн эрхийн бичиг",
      image: "../assets/gifts/1013.webp",
    },
    1014: {
      name: "BTF - 1 сая ₮-ийн эрхийн бичиг",
      image: "../assets/gifts/1014.webp",
    },
    1015: {
      name: "5.11 mongolia- 1 сая ₮-ийн эрхийн бичиг",
      image: "../assets/gifts/1015.webp",
    },
    1016: {
      name: "Kidzland – 800K ₮-ийн эрхийн бичиг",
      image: "../assets/gifts/1016.webp",
    },
  };
  const giftsforsend = {
    1001: {
      name: "Мальдивын аялал (хос)",
      image: "../assets/gifts/1001.webp",
    },
    1002: {
      name: "iPhone 15 Pro Max",
      image: "../assets/gifts/1002.webp",
    },
    1003: {
      name: "X Box Series X багц (3 тоглоом, 2 гар)",
      image: "../assets/gifts/1003.webp",
    },
    1004: {
      name: "iPad Air 5",
      image: "../assets/gifts/1004.webp",
    },
    1005: {
      name: "Airpods Pro Max",
      image: "../assets/gifts/1005.webp",
    },
    1006: {
      name: "L20 Ultra robot тоос сорогч",
      image: "../assets/gifts/1006.webp",
    },
    1007: {
      name: "Dyson агаар шүүгч & цэвэршүүлэгч",
      image: "../assets/gifts/1007.webp",
    },
    1008: {
      name: "Dyson Airwrap Олон үйлдэлт үсний стайлер",
      image: "../assets/gifts/1008.webp",
    },
    1009: {
      name: "iWatch s9 41mm ухаалаг цаг",
      image: "../assets/gifts/1009.webp",
    },
    1010: {
      name: "Nomun эрүүл мэндийн ресорт",
      image: "../assets/gifts/1010.webp",
    },
    1011: {
      name: "Intermed эмнэлэг - 2 сая ₮-ийн эрхийн бичиг",
      image: "../assets/gifts/1011.webp",
    },
  };

  let activePage = "home";
  let activeModal = "";
  let inventoryPageIndex = 0;
  let sendPageIndex = 0;
  let sendSelectedGift = 0;
  let sendWishesCount = 1;

  const fetchGifts = async () => {
    try {
      const res = await fetch(`/api/get_user_wish_list?sub_id=${subId}`);
      const data = await res.json();
      console.log("🚀 ~ file: index.js:77 ~ fetchGifts ~ data:", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  let userInventory = await fetchGifts();

  let inventoryItemsForPage = [];
  for (let i = 0; i < userInventory.wish_list.length; i += 4) {
    inventoryItemsForPage.push(userInventory.wish_list.slice(i, i + 4));
  }
  const drawInventory = () => {
    let sum = 0;
    const inventory = document.getElementById("inventoryList");
    if (userInventory.wish_list.length != 0) {
      for (let i = 0; i < userInventory.wish_list.length; i++) {
        sum += userInventory.wish_list[i].gift_voucher;
      }
      document.getElementById("sendWishesCount").innerHTML = sum;
      inventory.style.display = "block";
      inventory.innerHTML = "";
      inventoryItemsForPage[inventoryPageIndex].forEach((item, index) => {
        const newItem = document.createElement("div");
        newItem.style = `
          padding-left: 2rem;
          margin-bottom: 2rem;
          padding-right: 2rem;
          height: 5rem;
          color: rgb(255, 255, 255);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          border-radius: 10px;
          outline-style: dashed;
          outline-color: #9ca3af;
          font-size: 1.5rem;
          line-height: 2rem;
          opacity: 50%;
        `;

        newItem.innerHTML = `
        <p>${gifts[item.gift_id].name}</p>
        <p>${item.gift_voucher}</p>
  `;
        if (index === inventorySelectedGift) {
          newItem.style.opacity = "100%";
          newItem.style.outlineColor = "#64BE00";
        }
        inventory.appendChild(newItem);
      });
    } else {
      inventory.style.display = "flex";
      inventory.style.alignItems = "center";
      inventory.style.justifyContent = "center";
      inventory.style.flexDirection = "column";
      inventory.innerHTML = `<div
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  src="../assets/nogifts.png"
                  style="height: 8rem; width: 8rem; margin-bottom:2rem"
                  alt=""
                />
              </div>
              <div style="text-align: center; width: 40%; font-size: 1.5rem /* 30px */;
                  font-weight: 600; margin-bottom: 15vh">
                Танд илгээсэн хүсэл одоогоор байхгүй байна.
              </div>`;
    }
  };
  const drawInvetoryPagination = () => {
    document.getElementById("inventoryPagination").innerHTML = "";
    inventoryItemsForPage.forEach((_, idx) => {
      const item = document.createElement("div");
      item.textContent = idx + 1;
      item.style.width = `40px`;
      item.style.height = `40px`;
      item.style.color = "white";
      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.justifyContent = "center";
      item.style.borderRadius = "0.5rem";
      item.style.padding = "0.5rem";
      item.style.fontWeight = "700";
      item.style.fontSize = "1.5rem";
      if (inventoryPageIndex === idx) {
        item.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        item.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.2)";
      }
      document.getElementById("inventoryPagination").appendChild(item);
    });
  };

  const giftsArray = Object.entries(giftsforsend).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  let sendItemsForPage = [];
  for (let i = 0; i < giftsArray.length; i += 8) {
    sendItemsForPage.push(giftsArray.slice(i, i + 8));
  }
  console.log(sendItemsForPage);

  const sendWishes = async () => {
    try {
      const res = await fetch(
        `/api/send_wishes?sub_id=${subId}&user_id=1&gift_id=${sendItemsForPage[sendPageIndex][sendSelectedGift].id}&wish_count=${sendWishesCount}`
      );
      const data = await res.json();
      console.log("🚀 ~ file: index.js:77 ~ sendGifts ~ data:", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const drawSendPagination = () => {
    document.getElementById("sendPagination").innerHTML = "";
    sendItemsForPage.forEach((_, idx) => {
      const item = document.createElement("div");
      item.textContent = idx + 1;
      item.style.width = `40px`;
      item.style.height = `40px`;
      item.style.color = "white";
      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.justifyContent = "center";
      item.style.borderRadius = "0.5rem";
      item.style.padding = "0.5rem";
      item.style.fontWeight = "700";
      item.style.fontSize = "1.5rem";
      if (sendPageIndex === idx) {
        item.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        item.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.2)";
      }
      document.getElementById("sendPagination").appendChild(item);
    });
  };
  const drawSend = () => {
    document.getElementById("leftWishes").innerHTML =
      userInventory.total_voucher;
    const inventory = document.getElementById("sendWishesContainer");
    inventory.style.display = "grid";
    inventory.innerHTML = "";

    sendItemsForPage[sendPageIndex].forEach((item, index) => {
      const newItem = document.createElement("div");
      newItem.style = `
          opacity: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          height: 14rem;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
        `;
      newItem.innerHTML = `
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                src="${item.image}"
                alt=""
                style="height: 10rem; width: 10rem; object-fit: contain; border-radius: 10px"
              />
              <p style="font-size: large; text-align: center; font-weight: 500; color: #1a1a1a">
                ${item.name}
              </p>
            </div>
      `;

      if (index === sendSelectedGift) {
        newItem.style.opacity = "100%";
        newItem.style.backgroundColor = " rgba(255, 255, 255, 1)";
        newItem.style.boxShadow = "0 0 20px 5px rgba(255, 255, 255, 0.5)";
      }

      inventory.appendChild(newItem);
    });
  };
  const drawInventoryDescription = () => {
    if (userInventory.wish_list.length > 0) {
      document.getElementById("inventoryItemName").innerText =
        gifts[
          inventoryItemsForPage[inventoryPageIndex][
            inventorySelectedGift
          ].gift_id
        ].name;
      document.getElementById("inventoryItemImage").innerHTML = `<img
              src="${
                gifts[
                  inventoryItemsForPage[inventoryPageIndex][
                    inventorySelectedGift
                  ].gift_id
                ].image
              }"
              style="
                border-radius: 0.5rem;
                object-fit: contain;
                height: 16rem;
                width: 16rem;
              "
              alt=""
            />`;
      // if (
      //   inventoryItemsForPage[inventoryPageIndex][inventorySelectedGift]
      //     .name === "Top Motors - 2 сая ₮-ийн эрхийн бичиг" ||
      //   inventoryItemsForPage[inventoryPageIndex][inventorySelectedGift]
      //     .name === "Wellbee shop - 1 сая ₮-ийн эрхийн бичиг" ||
      //   inventoryItemsForPage[inventoryPageIndex][inventorySelectedGift]
      //     .name === "5.11 mongolia- 1 сая ₮-ийн эрхийн бичиг" ||
      //   inventoryItemsForPage[inventoryPageIndex][inventorySelectedGift]
      //     .name === "BTF - 1 сая ₮-ийн эрхийн бичиг" ||
      //   inventoryItemsForPage[inventoryPageIndex][inventorySelectedGift]
      //     .name === "Kidzland – 800K ₮-ийн эрхийн бичиг"
      // ) {
      //   document.getElementById("inventoryItemVoucher").innerText =
      //     "Хүсэлт хийх шаардлагатай";
      // }
    } else {
      const description = document.getElementById("inventoryDescription");
      description.style.display = "none";
    }
  };
  const drawSendModal = () => {
    const modal = document.getElementById("customDialog");
    modal.style.display = "flex";
    modal.innerHTML = "";
    modal.innerHTML = `<div
          style="
            width: 35vw;
            background-color: rgba(43, 32, 55, 0.9);
            border-radius: 30px;
            backdrop-filter: blur(5px);
            margin-top: 10vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3rem;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 2rem;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: white;
                padding: 1rem;
                width: 15rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 20px;
              "
            >
              <img
                src="${sendItemsForPage[sendPageIndex][sendSelectedGift].image}"
                alt=""
                style="
                  height: 10rem;
                  width: 10rem;
                  object-fit: contain;
                  border-radius: 10px;
                "
              />
              <p style="text-align: center; font-weight: 500; color: #1a1a1a">
                ${sendItemsForPage[sendPageIndex][sendSelectedGift].name}
              </p>
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top:1rem;
                margin-bottom:1rem;
                align-items: center;
              "
            >
              <div
                style="
                  padding: 0.5rem;
                  background-color: #11031c;
                  border-radius: 100%;
                  color: white;
                  font-weight: 700;
                  align-items: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="height: 2.5rem; width: 2.5rem"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>plus</title>
                  <path d="M19,13H5V11H19V13Z"></path>
                </svg>
              </div>

              <div
                style="
                  padding-left: 4rem;
                  margin-left:1rem;
                  margin-right:1rem;
                  border-radius: 9999px;
                  padding-right: 4rem;
                  padding-top: 0.75rem /* 12px */;
                  padding-bottom: 0.75rem /* 12px */;
                  background-color: white;
                  font-size: 1.875rem /* 30px */;
                  line-height: 2.25rem /* 36px */;
                  color: #11031c;
                "
              >
                ${sendWishesCount}
              </div>
              <div
                style="
                  padding: 0.5rem;
                  background-color: #11031c;
                  border-radius: 100%;
                  color: white;
                  font-weight: 700;
                  align-items: center;
                  display: flex;
                  justify-content: center;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="height: 2.5rem; width: 2.5rem"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>plus</title>
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                </svg>
              </div>
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 2rem;
                align-items: center;
              "
            >
              <div
                style="
                  padding-left: 4rem;
                  text-align: center;
                  width: 40%;
                  border-radius: 20px;
                  padding-right: 4rem;
                  padding-top: 0.75rem /* 12px */;
                  padding-bottom: 0.75rem /* 12px */;
                  background-color: #64be00;
                  font-size: 1.5rem /* 30px */;
                  font-weight: 700;
                  color: white;
                "
              >
                Илгээх
              </div>
            </div>
          </div>
        </div>`;
  };
  const drawSendModalError = () => {
    const modal = document.getElementById("customDialog");
    modal.style.display = "flex";
    modal.innerHTML = "";
    modal.innerHTML = `<div
          style="
            width: 35vw;
            background-color: rgba(43, 32, 55, 0.9);
            border-radius: 30px;
            backdrop-filter: blur(5px);
            margin-top: 10vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3rem;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 2rem;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                width: 4rem;

              "
            >
              <img
                src="../assets/sendError.png"
                alt=""
                style="
                  height: 4rem;
                  width: 4rem;
                  object-fit: contain;
                  border-radius: 10px;
                "
              />

            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 1rem;
                text-align:center;
                margin-top:1rem;
                margin-bottom:1rem;
                align-items: center;
                font-size: 1.5rem /* 30px */;
                  font-weight: 600;
              "
            >
              Хүслээ илгээх эрхийн тоо дууссан байна.
Урамшууллын эрх авснаар ахин хүслээ
илгээх боломжтой.
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 2rem;
                align-items: center;
              "
            >
              <div
                style="
                  padding-left: 4rem;
                  text-align: center;
                  width: 40%;
                  border-radius: 20px;
                  padding-right: 4rem;
                  padding-top: 0.75rem /* 12px */;
                  padding-bottom: 0.75rem /* 12px */;
                  background-color: #532DC2;
                  font-size: 1.5rem /* 30px */;
                  font-weight: 700;
                  color: white;
                "
              >
                Буцах
              </div>
            </div>
          </div>
        </div>`;
  };
  const drawSendModalSuccess = () => {
    const modal = document.getElementById("customDialog");
    modal.style.display = "flex";
    modal.innerHTML = "";
    modal.innerHTML = `<div
          style="
            width: 35vw;
            background-color: rgba(43, 32, 55, 0.9);
            border-radius: 30px;
            backdrop-filter: blur(5px);
            margin-top: 10vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3rem;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 2rem;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                width: 4rem;

              "
            >
              <img
                src="../assets/sendSuccess.png"
                alt=""
                style="
                  height: 4rem;
                  width: 4rem;
                  object-fit: contain;
                  border-radius: 10px;
                "
              />

            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 1rem;
                text-align:center;
                margin-top:1rem;
                margin-bottom:1rem;
                align-items: center;
                font-size: 1.5rem /* 30px */;
                  font-weight: 600;
              "
            >
              Та ${sendItemsForPage[sendPageIndex][sendSelectedGift].name}-д хүслээ илгээлээ.
              Танд амжилт хүсье.
              <br>
              <br>
              Тохирол 2024.01.17 болон 2024.02.06-ны өдрүүдэд Univision Mongolia
              Facebook хуудсаар 19:00 цагаас шууд дамжуулагдана.
            </div>

            <div
              style="
                display: flex;
                justify-content: center;
                gap: 2rem;
                align-items: center;
              "
            >
              <div
                style="
                  padding-left: 4rem;
                  text-align: center;
                  width: 40%;
                  border-radius: 20px;
                  padding-right: 4rem;
                  padding-top: 0.75rem /* 12px */;
                  padding-bottom: 0.75rem /* 12px */;
                  background-color: #532DC2;
                  font-size: 1.5rem /* 30px */;
                  font-weight: 700;
                  color: white;
                "
              >
                Буцах
              </div>
            </div>
          </div>
        </div>`;
  };
  window.addEventListener("popstate", function (event) {
    if (activePage !== "home") {
      if (activeModal === "") {
        location.reload();
      } else if (activeModal !== "") {
        document.getElementById("customDialog").style.display = "none";
        activeModal = "";
        sendWishesCount = 0;
      }
    }
  });
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "F8":
        history.back();
        if (activePage != "home") {
          if (activeModal === "") {
            location.reload();
          } else if (activeModal != "") {
            document.getElementById("customDialog").style.display = "none";
            activeModal = "";
            sendWishesCount = 0;
          }
        }
        break;
      case "Enter":
        if (activePage === "home") {
          if (selectedHomeButton === "inventory") {
            activePage = "inventory";
            const state = { page: activePage };
            window.history.pushState(state, null, "");
            document.getElementById("homePage").style.display = "none";
            document.getElementById("send").style.display = "none";
            document.getElementById("inventory").style.display = "flex";
            drawInventoryDescription();
            drawInventory();
            drawInvetoryPagination();
          } else if (selectedHomeButton === "send") {
            activePage = "send";
            const state = { page: activePage };
            window.history.pushState(state, null, "");
            document.getElementById("inventory").style.display = "none";
            document.getElementById("homePage").style.display = "none";
            document.getElementById("send").style.display = "flex";
            drawSend();
            drawSendPagination();
          }
        } else if (activePage === "send") {
          const state = { page: "sending" };
          window.history.pushState(state, null, "");
          if (activeModal === "") {
            if (userInventory.total_voucher > 0) {
              activeModal = "sendModal";
              drawSendModal();
            } else if (userInventory.total_voucher === 0) {
              activeModal = "sendModalError";
              drawSendModalError();
            }
          } else if (activeModal === "sendModal") {
            sendWishes()
              .then(async () => {
                userInventory = await fetchGifts();
              })
              .then(() => {
                drawSend();
                activeModal = "sendModalSuccess";
                drawSendModalSuccess();
              });
            activeModal = "";
            document.getElementById("customDialog").style.display = "none";
          } else if (activeModal === "sendModalError") {
            document.getElementById("customDialog").style.display = "none";
            activeModal = "";
            sendWishesCount = 0;
          } else if (activeModal === "sendModalSuccess") {
            document.getElementById("customDialog").style.display = "none";
            activeModal = "";
            sendWishesCount = 0;
          }
        }
        break;

      case "ArrowRight":
        if (activePage === "home") {
          selectedHomeButton = "inventory";
          document.getElementById("homeButton2").style.backgroundColor =
            "rgba(43, 32, 55, 1)";
          document.getElementById("homeButton1").style.backgroundColor =
            "rgba(43, 32, 55, 0.5)";
        } else if (activePage === "inventory") {
          inventoryPageIndex = Math.min(
            inventoryItemsForPage.length - 1,
            inventoryPageIndex + 1
          );
          inventorySelectedGift = 0;
          drawInventory();
          drawInventoryDescription();
          drawInvetoryPagination();
        } else if (activePage === "send") {
          if (activeModal === "") {
            if (
              sendSelectedGift >= sendItemsForPage[sendPageIndex].length - 1 &&
              sendPageIndex < sendItemsForPage.length - 1
            ) {
              sendPageIndex = Math.min(
                sendItemsForPage.length - 1,
                sendPageIndex + 1
              );
              sendSelectedGift = 0;
            } else {
              sendSelectedGift = Math.min(
                sendItemsForPage[sendPageIndex].length - 1,
                sendSelectedGift + 1
              );
            }
            drawSendPagination();
            drawSend();
          } else if (activeModal === "sendModal") {
            if (sendWishesCount < userInventory.total_voucher) {
              sendWishesCount++;
              drawSendModal();
            }
          }
        }
        break;

      case "ArrowLeft":
        if (activePage === "home") {
          selectedHomeButton = "send";
          document.getElementById("homeButton1").style.backgroundColor =
            "rgba(43, 32, 55, 1)";
          document.getElementById("homeButton2").style.backgroundColor =
            "rgba(43, 32, 55, 0.5)";
        } else if (activePage === "inventory") {
          inventoryPageIndex = Math.max(0, inventoryPageIndex - 1);
          inventorySelectedGift = 0;
          drawInventory();
          drawInventoryDescription();
          drawInvetoryPagination();
        } else if (activePage === "send") {
          if (activeModal === "") {
            if (sendSelectedGift <= 0 && sendPageIndex > 0) {
              sendPageIndex = Math.max(0, sendPageIndex - 1);
              sendSelectedGift = sendItemsForPage[sendPageIndex].length - 1;
            } else {
              sendSelectedGift = Math.max(0, sendSelectedGift - 1);
            }
            drawSendPagination();
            drawSend();
          } else if (activeModal === "sendModal") {
            if (sendWishesCount > 1) {
              sendWishesCount--;
              console.log(sendWishesCount);
              drawSendModal();
            }
          }
        }
        break;

      case "ArrowUp":
        if (activePage === "inventory") {
          inventorySelectedGift = Math.max(0, inventorySelectedGift - 1);
          drawInventory();
          drawInventoryDescription();
        } else if (activePage === "send") {
          if (activeModal === "" && sendSelectedGift >= 4) {
            sendSelectedGift -= 4;
            drawSendPagination();
            drawSend();
          } else if (sendPageIndex > 0) {
            sendSelectedGift = sendSelectedGift + 4;
            [sendPageIndex--];
            drawSendPagination();
            drawSend();
          }
        }
        break;

      case "ArrowDown":
        if (activePage === "inventory") {
          inventorySelectedGift = Math.min(
            inventoryItemsForPage[inventoryPageIndex].length - 1,
            inventorySelectedGift + 1
          );
          drawInventory();
          drawInventoryDescription();
        } else if (activePage === "send") {
          if (
            activeModal === "" &&
            sendSelectedGift + 4 < sendItemsForPage[sendPageIndex].length
          ) {
            sendSelectedGift += 4;
            drawSendPagination();
            drawSend();
          } else if (sendPageIndex < sendItemsForPage.length - 1) {
            sendSelectedGift = sendSelectedGift - 4;
            [sendPageIndex++];
            drawSendPagination();
            drawSend();
          }
        }
        break;
    }
  });
});
