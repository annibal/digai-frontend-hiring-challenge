import { useEffect, useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import NivoLineChartOne, { mockLineChartData1, genMockLineChartData } from "@/components/NivoLineChartOne";
import { getListOfTargets } from "@/providers/targetNames.provider";
import { PiArrowsClockwiseFill, PiCalendarDotsFill } from "react-icons/pi";
import { TbMessage2Up, TbMessage2Down, TbClockCheck } from "react-icons/tb";
import { GoDiscussionOutdated } from "react-icons/go";
import { GiHumanTarget } from "react-icons/gi";
import { MdOutlineForum } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { randomRange } from "@/utils/random";
import getRelativeDateSpelled from "@/utils/relativeDate";

export default function HomePage() {
  const [chartData, setChartData] = useState([]);
  const [logs, setLogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [targets, setTargets] = useState([]);
  const [dateBins, setDateBins] = useState([]);
  const [targetAmount, setTargetAmount] = useState(50);
  const [dateBinAmount, setDateBinAmount] = useState(60);
  const [selectedTargetIdx, setSelectedTargetIdx] = useState<number | null>(null);

  const regenData = () => {
    console.debug("regenerate data", { dateBins: JSON.parse(JSON.stringify(dateBins)) });
    const { lineChartData, logs } = genMockLineChartData({
      bumpMsgAfter: 3,
      maxMsgs: 5,
      maxVacuo: 11,
      dates: dateBins.map((dt) => dt.toISOString()),
      // dates: dateBins.map((dt) => dt.toLocaleDateString().slice(0, 5)),
      targets,
    });

    const lastLogSummary = (logs || []).slice(-1)[0]?.summary;
    console.debug("lastLogSummary", lastLogSummary);
    console.debug("lineChartData", JSON.parse(JSON.stringify(lineChartData)));
    console.debug("logs", logs);

    if (!lastLogSummary) {
      throw new Error("Failed to get Chart Data");
    }

    setChartData(lineChartData);
    setLogs(logs);

    const mapStatusColor = lineChartData.reduce((a, c) => ({ ...a, [c.id]: [c.color] }), {});
    console.debug("mapStatusColor", mapStatusColor);

    const lastStatusMsgs = Object.entries(lastLogSummary.negotiations).map(([k, v]) => ({
      ...(v as any),
      target: k,
      statusColor: mapStatusColor[(v as any).statusObj?.status],
    }));
    setMessages(lastStatusMsgs);

    console.debug("messages", lastStatusMsgs);
  };

  const updateTargets = (amount: number) => {
    const res = getListOfTargets(+amount, 2.6, 8);
    setTargets(res);
  };

  const updateDateBins = (amount: number) => {
    const tNow = Date.now();

    const dts = Array(amount)
      .fill(null)
      .map((_, i) => new Date(tNow - 86400 * 1000 * i + randomRange(1200, 3600 * 6) * 1000))
      .reverse();

    setDateBins(dts);
  };

  useEffect(() => {
    updateTargets(targetAmount);
    updateDateBins(dateBinAmount);
  }, []);

  useEffect(() => {
    if (targets.length && dateBins.length) {
      regenData();
    }
  }, [targets, dateBins]);

  const handleTargetAmountSubmit = (evt) => {
    evt.preventDefault();
    const values = Object.fromEntries(new FormData(evt.target));
    updateDateBins(+values.dateBinAmount);

    setTargetAmount(+values.targetAmount);
    updateTargets(+values.targetAmount);
  };

  const currentTarget = messages[selectedTargetIdx];

  return (
    <>
      <section className="pb-12">
        <div className="flex justify-between gap-4">
          <p>Nivo Line Chart</p>

          <button
            className="inline-flex items-center justify-center gap-4 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={() => regenData()}
          >
            <PiArrowsClockwiseFill className="text-xl" />
            Roll the Dice
          </button>
        </div>
        <div className="card">
          <NivoLineChartOne data={chartData} height="480px" width="1240px" />
        </div>
      </section>

      <section className="pb-24 pt-16 flex md:flex-row flex-col items-center container gap-4">
        {/* Col Before */}
        <div className="lg:flex-grow flex flex-col" style={{ maxHeight: "75vh", minHeight: "300px" }}>
          {/* Card's Gray Header */}
          <div className="flex-shrink flex text-base px-3 py-2 bg-gray-200 border border-gray-400 w-full rounded-t-lg">
            {/* Title and Count, Before */}
            <h5 className="flex items-center gap-2 font-medium text-gray-700 flex-grow">
              <span>Targets</span>
              <span className="text-sm text-gray-400">{targets.length}</span>
            </h5>

            {/* Change people number, After */}
            <form onSubmit={handleTargetAmountSubmit} className="flex items-center ">
              <div className="w-8 text-lg flex items-center justify-center bg-indigo-200 border border-r-0 border-indigo-700 text-indigo-700 h-8 rounded-l-md">
                <PiCalendarDotsFill />
              </div>
              <input
                defaultValue={dateBinAmount}
                step={15}
                min={15}
                max={365}
                name="dateBinAmount"
                className="w-28 text-base font-mono border border-indigo-700 px-2 py-1 h-8 rounded-r-md bg-gray-50 mr-4"
                type="number"
                // value={targetAmount}
                // onChange={(evt) => setTargetAmount(+evt.target.value)}
              />

              <div className="w-8 text-lg flex items-center justify-center bg-indigo-200 border border-r-0 border-indigo-700 text-indigo-700 h-8 rounded-l-md">
                <GiHumanTarget />
              </div>
              <input
                defaultValue={targetAmount}
                step={5}
                min={5}
                max={1000}
                name="targetAmount"
                className="w-20 text-base font-mono border border-indigo-700 px-2 py-1 h-8 bg-gray-50"
                type="number"
                // value={targetAmount}
                // onChange={(evt) => setTargetAmount(+evt.target.value)}
              />
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 w-12 flex items-center justify-center border border-l-0 border-indigo-700 text-lg font-mono px-2 py-1 h-8 rounded-r-md"
              >
                <PiArrowsClockwiseFill />
              </button>
            </form>
          </div>

          {/* Card's Body */}
          <ul className="flex-grow border border-t-0 bg-white border-gray-400 overflow-auto block p-0 pb-4 m-0 w-full rounded-b-lg">
            {messages.map((msg, idx) => {
              const name = msg.target;
              const st = msg.statusObj || {};
              const statusLabel = st.status;
              const statusColor = msg.statusColor;
              const isProcessed = Boolean(st.isProcessed);
              const lastMessageDate = dateBins[st.lastMsg];
              const lastReceivedMessageDate = dateBins[st.lastRecvMsg];
              const messagesSent = st.sentMsgs;
              const messagesReceived = st.recvMsgs;

              let strLast = "---";
              if (lastMessageDate) {
                strLast = getRelativeDateSpelled(lastMessageDate, {
                  style: "narrow",
                  locale: "en",
                  maxParts: 3,
                  joinPartsStr: ", ",
                  joinLastPartsStr: ", ",
                  // mapPartUnits: {
                  //   year: "y",
                  //   month: "m",
                  //   week: "w",
                  //   day: "d",
                  //   hour: "h",
                  //   minute: "min",
                  //   second: "s",
                  // },
                  // padValue: true,
                });
              }

              return (
                <li
                  key={idx}
                  className={twMerge(
                    "text-sm font-medium leading-tight",
                    "px-3 py-1",
                    "flex items-stretch",
                    "hover:bg-indigo-100",
                    selectedTargetIdx === idx && "bg-indigo-600 hover:bg-indigo-600 text-white text-opacity-90",
                  )}
                  onClick={() => setSelectedTargetIdx(idx)}
                >
                  <span
                    className={twMerge(
                      "font-mono text-xs leading-none",
                      "flex items-center",
                      "pt-1 mr-2",
                      "text-indigo-700 text-opacity-80",
                      selectedTargetIdx === idx && "text-white",
                    )}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="flex-auto flex items-center font-normal">{name}</span>
                  <span
                    className={twMerge(
                      "font-normal leading-normal uppercase tracking-wide",
                      "py-0.5 px-3 rounded-xl",
                      "text-white opacity-80",
                      "border border-transparent",
                      selectedTargetIdx === idx && "border-white",
                    )}
                    style={{ fontSize: "0.6rem", background: statusColor }}
                  >
                    {statusLabel}
                  </span>
                  <div className="flex gap-1 text-left items-center pr-0 pl-4">
                    {/* <GoDiscussionOutdated
                      className={twMerge(
                        "text-xl text-gray-700 text-opacity-60",
                        selectedTargetIdx === idx && "text-gray-300 text-opacity-80",
                      )}
                    /> */}
                    <span className="inline-block text-gray-500">{strLast}</span>
                  </div>
                  <div className="flex gap-1 text-left items-center p-0 pl-3">
                    <TbMessage2Up
                      className={twMerge(
                        "text-xl text-red-900 text-opacity-60",
                        selectedTargetIdx === idx && "text-red-300 text-opacity-80",
                        messagesSent == 0 && "text-gray-400",
                      )}
                    />
                    <span className={twMerge("inline-block w-5", messagesSent == 0 && "text-gray-500")}>{messagesSent}</span>
                    <TbMessage2Down
                      className={twMerge(
                        "text-xl text-blue-900 text-opacity-60",
                        selectedTargetIdx === idx && "text-blue-300 text-opacity-80",
                        messagesReceived == 0 && "text-gray-400",
                      )}
                    />
                    <span className={twMerge("inline-block w-5", messagesReceived == 0 && "text-gray-500")}>
                      {messagesReceived}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Col After */}
        <div className="max-w-sm w-full h-screen flex flex-col" style={{ maxHeight: "75vh", minHeight: "300px" }}>
          {/* Title */}
          <div className="flex text-lg px-3 py-2 border-b border-gray-400">
            <MdOutlineForum className="text-2xl mr-2" />
            <div className="flex-grow flex flex-col items-start">
              <h5 className="flex items-center leading-none gap-2 font-medium text-gray-700 flex-grow flex items-center">
                Messages
              </h5>
              <p className="m-0 mt-1 leading-tight font-normal text-gray-500 text-xs">
                {currentTarget ? currentTarget.target : "Select a Target"}
              </p>
            </div>
          </div>

          {/* Messages List */}
          {currentTarget && (
            <ul className="overflow-x-hidden overflow-y-scroll block pt-2 pb-80">
              {(currentTarget.messages || []).map((msg, msgIdx) => {
                const isSent = msg.dir === "sent";
                const isReceived = msg.dir === "recv";
                const isSystem = msg.dir === "syst";
                const content = msg.type;
                const { date, cycle } = msg;
                const userName = currentTarget.target.split(" ")[0] + (currentTarget.target.split(" ")[1] || "").slice(0);

                return (
                  <li
                    key={msg.target + msgIdx}
                    className={twMerge("flex py-1 ", isSent && "justify-end", isSystem && "justify-center text-center py-2")}
                  >
                    <article
                      className={twMerge(
                        "rounded-t-lg",
                        "pt-1 pb-2 px-2 max-w-xs",
                        "flex items-end",
                        "leading-tight",
                        isSent && "text-red-900 bg-red-100 rounded-l-lg",
                        isReceived && "text-blue-900 bg-blue-100 rounded-r-lg",
                        isSystem && "text-gray-900 border-b px-8 border-gray-400 rounded-none flex-col-reverse items-center",
                      )}
                    >
                      {/* <p
                        className={twMerge(
                          "font-medium flex gap-4",
                          isSent && "flex-row-reverse -mr-2",
                          isReceived && "flex-row -ml-2",
                        )}
                        style={{ fontSize: "0.6rem" }}
                      >
                        <span className="flex-grow">
                          {isSent && "Operator"}
                          {isReceived && userName}
                        </span>

                        <span className="font-normal">{date}</span>
                      </p> */}
                      <p className={twMerge("text-sm font-base lowercase leading-tight", isSystem && "font-light")}>
                        {content}
                      </p>

                      <small
                        style={{ fontSize: isSystem ? "" : "0.6rem" }}
                        className={twMerge(
                          "font-medium px-4 text-opacity-80 -mb-1",
                          isSent && "pr-0 text-red-800",
                          isReceived && "pr-0 text-blue-800",
                          isSystem && "font-base text-gray-900 text-opacity-50 mb-0 leading-normal text-xs",
                        )}
                      >
                        {date}
                      </small>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

// -------------------------------------
// -------------------------------------
// -------------------------------------

const old = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <section className="pb-24 flex md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Faça sua entrevista gravando áudio!
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag.
            Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.
          </p>
          <div className="flex justify-center">
            <Link
              to={`/interview-setup/1234ABCD`}
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Página: Preparação
            </Link>
            <Link
              to={`/interview/1234ABCD`}
              className="ml-4 inline-flex bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
            >
              Página: Entrevista
            </Link>
            <Link
              to={`/interview-after/1234ABCD`}
              className="ml-4 inline-flex bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
            >
              Página: Resultado
            </Link>
          </div>
        </div>

        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600/edf2f7/a5afbd" />
        </div>
      </section>

      <section className="pb-24 flex md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="flex items-center gap-4">
            <a href="https://vitejs.dev" target="vite">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="react">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            <h1 className="text-3xl font-bold leading-none">Vite + React</h1>
          </div>
          <div className="card">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="my-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
            >
              Count is&nbsp;<b>{count}</b>
            </button>
            <p>
              Edit <code>src/components/AppRoot/AppRoot.tsx</code> and save to test HMR
            </p>
            <p></p>
          </div>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </div>
      </section>
    </>
  );
};
