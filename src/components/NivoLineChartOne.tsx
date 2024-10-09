import { randomElement, randomRange } from "@/utils/random";
import { ResponsiveLine } from "@nivo/line";

export type LineChartData = Array<{
  id: string | number;
  color?: string;
  data: Array<{
    x: number | string | Date;
    y: number | string | Date;
  }>;
}>;

export interface NivoLineChartOne {
  data: LineChartData;
  height?: number | string;
  width?: number | string;
}

export default function NivoLineChartOne({ data, height, width }: NivoLineChartOne) {
  console.log("chartData", JSON.parse(JSON.stringify(data)));
  const bins = (data[0]?.data || []).length;

  const tickVals = Math.floor(bins / 12);

  return (
    <div className="nivo-line-chart-one" style={{ width, height }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 45, right: 25, bottom: 50, left: 40 }}
        xScale={{
          type: "time",
          // format: "%Y-%m-%d",
          format: "%Y-%m-%dT%H:%M:%S.%LZ",
          useUTC: false,
          precision: "minute",
        }}
        xFormat="time:%d %b %Y - %H:%M:%S"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.0f"
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: "",
          legendOffset: 44,
          legendPosition: "start",
          // truncateTickAt: 200,

          format: "%b %d",
          tickValues: `every ${tickVals} days`,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: "",
          legendOffset: -40,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        colors={{
          datum: "color",
        }}
        enablePoints={false}
        pointSize={10}
        pointColor={{ from: "serieColor", modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor", modifiers: [] }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={1}
        isInteractive={true}
        enableTouchCrosshair={true}
        crosshairType="cross"
        useMesh={true}
        enableSlices="x"
        legends={[
          {
            anchor: "top",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -40,
            itemsSpacing: 12,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 1,
            symbolSize: 16,
            symbolShape: "circle",
            toggleSerie: true,
            symbolBorderColor: "rgba(0, 0, 0, 0.8)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        sliceTooltip={({ slice }) => {
          console.log(slice);
          return (
            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                padding: "6px 12px 8px",
                border: "1px solid #CACACA",
                borderRadius: "8px"
              }}
            >
              <strong >
                {slice.points[0]?.data.xFormatted}
              </strong>

              <div style={{ borderTop: "1px solid #CACACA", marginTop: "6px", padding: "2px 16px 0" }}>
                {slice.points.map((point, idx) => (
                  <p
                    key={point.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 16px",
                      gap: "0.5em",
                      borderTop: idx > 0 ? "1px solid #CACACA" : "",
                      height: "28px",
                    }}
                  >
                    <span
                      style={{
                        lineHeight: "1",
                        display: "inline-block",
                        flex: "0 1 auto",
                        textAlign: "left",
                        paddingBottom: "3px",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        marginInlineEnd: "auto",
                      }}
                    >
                      {point.serieId}:
                    </span>

                    <span
                      style={{
                        lineHeight: "1",
                        display: "inline-block",
                        fontFamily: "monospace",
                        flex: "1 1 auto",
                        textAlign: "right",
                        // maxWidth: "40px",
                        fontWeight: 600,
                        fontSize: "1rem",
                        marginInlineStart: "8px",
                      }}
                    >
                      {point.data.yFormatted}
                    </span>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: point.serieColor,
                        border: "1px solid #3c3c3c",
                        borderRadius: "50%",
                      }}
                    />
                  </p>
                ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

function emojiStatus({ isProcessed, isFinalMessageSent }) {
  if (!isProcessed) {
    return "⌛:❌, 🏁:➖";
  }

  return `⌛:✅, 🏁:${isFinalMessageSent ? "✅" : "❌"}`;
}
function emojiMsgCount(cycle, { sentMsgs, recvMsgs, lastMsg, lastRecvMsg }) {
  const str = [`👆🏻: ${sentMsgs}`, `👇: ${recvMsgs}`, `🕘: ${cycle - lastMsg}`, `🕘👇: ${cycle - lastRecvMsg}`].join(", ");

  return `✉️[${str}]`;
}

const makeLogEvt = (logEvent) => {
  return logEvent
    .map((x) => {
      if (!x) return;
      if (typeof x === "string") return x;

      try {
        const entries = Object.entries(x);
        return entries.map(([k, v]) => `${k}:'${v}'`).join(", ");
      } catch (er) {
        //
      }

      try {
        return `${x}`;
      } catch (err) {
        //
      }
    })
    .filter(Boolean)
    .join(", ");
};

export const genMockLineChartData = ({ targets, dates, maxMsgs, bumpMsgAfter, maxVacuo }) => {
  const logs = [];

  function logStuff(...args: any[]) {
    console.debug(args);
    const logEvtContent = makeLogEvt(args);
    logs.push(logEvtContent);
    console.debug("-: " + logEvtContent);
  }

  logStuff({ targets, dates, maxMsgs, bumpMsgAfter, maxVacuo });

  const stateTree: any = {
    // { /*    */ color: "#78CFCA", nextStates: { "running": 70, "halted": 2, "failed": 5 } },
    queued: { /*    */ color: "#78CFCA", nextStates: { running: 99, failed: 1 } },
    paused: { /*    */ color: "#454545", nextStates: { queued: 50, paused: 20, halted: 30 } },
    // { /*   */ color: "#E58A00", nextStates: { "paused": 6, "halted": 2, "running": 70, "failed": 1 } }, // { "processed": 70 } },
    running: { /*   */ color: "#E58A00", nextStates: { paused: 1, running: 99 } }, // { "processed": 70 } },
    halted: { /*    */ color: "#5D0000", nextStates: null },
    failed: { /*    */ color: "#A40000", nextStates: null },
    // processed: { /* */ color: "#009612", nextStates: null }, // { "accepted": 1, "refused": 1, "postponed": 1 } },
    accepted: { /*  */ color: "#111C9D", nextStates: null },
    refused: { /*   */ color: "#9747FF", nextStates: null },
    postponed: { /* */ color: "#4D9AD5", nextStates: null },
  };

  Object.keys(stateTree).forEach((key) => {
    stateTree[key].summaryData = dates.map((date) => ({ x: date, y: 0 }));
    stateTree[key].normNextStates = [];

    const nextStates = stateTree[key].nextStates;
    if (!nextStates) return;

    let arr = [];
    Object.entries(nextStates).forEach(([s, w]) => {
      arr = [...arr, ...`${s},`.repeat(+w).slice(0, -1).split(",")];
    });

    stateTree[key].normNextStates = arr;
  });

  logStuff({ stateTree: JSON.stringify(stateTree, null, 2) });

  const negotiations = targets.map((t) => ({
    name: t,
    state: "queued",
    lastMsg: 0,
    lastRecvMsg: 0,
    // replyChance:     randomRange(4, 10),
    // decideChance:    randomRange(2, 10),
    // acceptChance:    randomRange(5, 10),
    // postponeChance:  randomRange(3, 7),
    // minMsgsToDecide: randomRange(1, 7),
    replyChance: 3,
    decideChance: 7,
    acceptChance: 5,
    postponeChance: 8,
    minMsgsToDecide: 3,
    isProcessed: false,
    isFinalMessageSent: false,
    messages: [],
    sentMsgs: 0,
    recvMsgs: 0,
  }));

  const makeDaySummary = (cycle) => {
    const logObj = { states: {}, negotiations: {} };

    Object.keys(stateTree).forEach((key) => {
      logObj.states[key] = 0;

      negotiations.forEach((neg) => {
        logObj.negotiations[neg.name] = {
          status: [`${neg.state}`, emojiStatus(neg), emojiMsgCount(cycle, neg)].join(", "),
          statusObj: {
            status: neg.state,
            isProcessed: neg.isProcessed,
            isFinalMessageSent: neg.isFinalMessageSent,
            sentMsgs: neg.sentMsgs,
            recvMsgs: neg.recvMsgs,
            lastMsg: neg.lastMsg,
            lastRecvMsg: neg.lastRecvMsg,
          },
          messages: neg.messages.slice(),
        };

        if (neg.state === key) {
          stateTree[key].summaryData[cycle].y += 1;

          logObj.states[key] += 1;
        }
      });
    });

    console.debug("Day Summary", logObj);
    return logObj;
  };

  dates.forEach((date, cycle) => {
    let msgsSent = 0;
    const logObj = { cycle, date, events: [], summary: {} };

    for (let nIdx = 0; nIdx < negotiations.length; nIdx++) {
      const neg = negotiations[nIdx];
      const logEvtBase: any = [{ cycle }, { nIdx }, { target: neg.name }, { state: `${neg.state}, ${emojiStatus(neg)}` }];

      const logAnEvent = (parts) => {
        const logEvtContent = makeLogEvt([...logEvtBase, ...parts]);
        logObj.events.push(logEvtContent);
        console.debug(">: " + logEvtContent);
      };
      const canSendMsg = () => msgsSent <= maxMsgs;

      const sendMsg = (dir, type) => {
        if (dir == "recv") {
          neg.messages.push({ dir, type, date, cycle });
          neg.recvMsgs += 1;
          neg.lastMsg = cycle;
          neg.lastRecvMsg = cycle;

          logAnEvent([{ message: `✉️👇: ${type}` }]);
          return true;
        }

        if (dir == "sent") {
          if (canSendMsg()) {
            neg.messages.push({ dir, type, date, cycle });
            neg.sentMsgs += 1;
            neg.lastMsg = cycle;
            msgsSent += 1;

            logAnEvent([`Sent message ${msgsSent} of ${maxMsgs} max daily msgs`, { message: `✉️👆🏻: ${type}` }]);
            return true;
          } else {
            logAnEvent(["Failed to 👆🏻 send ✉️ message", { msgsSent, maxMsgs }, { message: type }]);
            return false;
          }
        }

        if (dir == "syst") {
          neg.messages.push({ dir, type, date, cycle });
          return true;
        }

        logAnEvent([{ "⚠️ unknown message dir": dir }, { message: type }]);
        return false;
      };
      const changeState = (nxtState?) => {
        const nextState = nxtState === undefined ? randomElement(stateTree[neg.state].normNextStates) : nxtState;
        if (nextState !== neg.state) {
          logAnEvent([{ nextState }]);
          sendMsg("syst", `Changed state from "${neg.state}" to "${nextState}"`);
        }
        neg.state = nextState;
      };

      if (neg.state == "paused") {
        // chance of someone un-pausing it
        changeState();
        continue;
      }

      if (neg.state == "halted" || neg.state == "failed") {
        continue;
      }

      // ok we can handle this one

      if (neg.state == "queued" && canSendMsg()) {
        changeState();

        if (neg.state === "running") {
          sendMsg("sent", "First contact");
        }
        continue;
      }

      // chance to Pause, Halt, or Fail here
      if (neg.state == "running") {
        changeState();
      }
      // check if it survived - its still running
      if (neg.state == "running") {
        if (randomRange(0, 10) > neg.replyChance) {
          // target replied
          logAnEvent(["target will Reply"]);

          const canDecide = neg.recvMsgs >= neg.minMsgsToDecide;

          if (canDecide && randomRange(0, 10) > neg.decideChance) {
            neg.isProcessed = true;
            logAnEvent(["target will Decide"]);

            if (randomRange(0, 10) > neg.postponeChance) {
              sendMsg("recv", "I do not want to decide right now.");
              changeState("postponed");
            } else {
              sendMsg("recv", "I made a decision:");

              if (randomRange(0, 10) > neg.acceptChance) {
                sendMsg("recv", "I accept your offer.");
                changeState("accepted");
              } else {
                sendMsg("recv", "I refuse.");
                if (randomRange(0, 10) > 9) sendMsg("recv", "And please do not ever talk to me again.");
                changeState("refused");
              }
            }
          } else {
            sendMsg(
              "recv",
              randomElement([
                "What is this",
                "I don't know you",
                "I cannot pay",
                "Give me more information",
                "Who gave you my number",
                "Basic human response",
                "Silly human response",
                "Generic human response",
              ]),
            );

            sendMsg(
              "sent",
              randomElement([
                "Respectful reply to enhance friendship with target",
                "Descriptive text with lots of information to decrease doubt",
                "Tactical phrase to evoke an agreement decision",
                "Insightful response with a better payment plan",
              ]),
            );

            if (randomRange(0, 10) > 7) {
              sendMsg("recv", "Useless message that only counts toward the operator's daily message limit");
              sendMsg("sent", "Intelligently structured response, as usual");
            }
          }
        } else {
          // ignored

          if (cycle - neg.lastRecvMsg >= maxVacuo) {
            logEvtBase.push(emojiMsgCount(cycle, neg));
            changeState("failed");
            continue;
          }
          if (cycle - neg.lastMsg >= bumpMsgAfter) {
            logEvtBase.push(emojiMsgCount(cycle, neg));
            sendMsg("sent", "Bump contact");
            continue;
          }
        }
      }

      // if (neg.state == "processed") {
      //   if (randomRange(0, 10) > neg.acceptChance) {
      //   } else {
      //   }
      // }

      if (!neg.isFinalMessageSent) {
        let didSend = false;

        if (neg.state == "accepted") {
          didSend = sendMsg("sent", "Appreciation for accepting, instructions for next steps");
        }
        if (neg.state == "postponed") {
          didSend = sendMsg("sent", "Ack and inform the re-schedulement");
        }
        if (neg.state == "refused") {
          didSend = sendMsg("sent", "Understood the refusal, thanks for your cooperation");
        }

        if (didSend) {
          neg.isFinalMessageSent = true;
          logAnEvent(["set 🏁FinalMessage as ✅sent"]);
        }
      }
    }

    logObj.summary = makeDaySummary(cycle);

    console.debug("stateTree", stateTree);
    const sep = `${"-".repeat(32)}\n>>: End of ${cycle}° cycle\n${"-".repeat(32)}`;
    console.debug(sep);
    logObj.events.push(sep);

    logs.push(logObj);
  });

  const lineChartData = Object.entries(stateTree).map(([key, val]) => ({
    id: key,
    color: (val as any).color,
    data: (val as any).summaryData.slice(),
  }));

  const r = {
    lineChartData,
    logs,
  };
  console.log("Line Chart Data : final result ->", r);
  return r;
};

export const mockLineChartData1: LineChartData = [
  {
    id: "japan",
    color: "hsl(250, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 255,
      },
      {
        x: "helicopter",
        y: 118,
      },
      {
        x: "boat",
        y: 7,
      },
      {
        x: "train",
        y: 35,
      },
      {
        x: "subway",
        y: 255,
      },
      {
        x: "bus",
        y: 163,
      },
      {
        x: "car",
        y: 4,
      },
      {
        x: "moto",
        y: 62,
      },
      {
        x: "bicycle",
        y: 186,
      },
      {
        x: "horse",
        y: 162,
      },
      {
        x: "skateboard",
        y: 237,
      },
      {
        x: "others",
        y: 265,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(351, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 62,
      },
      {
        x: "helicopter",
        y: 176,
      },
      {
        x: "boat",
        y: 210,
      },
      {
        x: "train",
        y: 159,
      },
      {
        x: "subway",
        y: 71,
      },
      {
        x: "bus",
        y: 167,
      },
      {
        x: "car",
        y: 199,
      },
      {
        x: "moto",
        y: 81,
      },
      {
        x: "bicycle",
        y: 181,
      },
      {
        x: "horse",
        y: 171,
      },
      {
        x: "skateboard",
        y: 227,
      },
      {
        x: "others",
        y: 60,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(106, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 163,
      },
      {
        x: "helicopter",
        y: 98,
      },
      {
        x: "boat",
        y: 262,
      },
      {
        x: "train",
        y: 251,
      },
      {
        x: "subway",
        y: 215,
      },
      {
        x: "bus",
        y: 268,
      },
      {
        x: "car",
        y: 216,
      },
      {
        x: "moto",
        y: 37,
      },
      {
        x: "bicycle",
        y: 291,
      },
      {
        x: "horse",
        y: 262,
      },
      {
        x: "skateboard",
        y: 13,
      },
      {
        x: "others",
        y: 221,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(204, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 47,
      },
      {
        x: "helicopter",
        y: 59,
      },
      {
        x: "boat",
        y: 244,
      },
      {
        x: "train",
        y: 215,
      },
      {
        x: "subway",
        y: 79,
      },
      {
        x: "bus",
        y: 37,
      },
      {
        x: "car",
        y: 250,
      },
      {
        x: "moto",
        y: 248,
      },
      {
        x: "bicycle",
        y: 5,
      },
      {
        x: "horse",
        y: 295,
      },
      {
        x: "skateboard",
        y: 211,
      },
      {
        x: "others",
        y: 290,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(73, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 258,
      },
      {
        x: "helicopter",
        y: 223,
      },
      {
        x: "boat",
        y: 251,
      },
      {
        x: "train",
        y: 258,
      },
      {
        x: "subway",
        y: 146,
      },
      {
        x: "bus",
        y: 267,
      },
      {
        x: "car",
        y: 255,
      },
      {
        x: "moto",
        y: 147,
      },
      {
        x: "bicycle",
        y: 9,
      },
      {
        x: "horse",
        y: 93,
      },
      {
        x: "skateboard",
        y: 248,
      },
      {
        x: "others",
        y: 31,
      },
    ],
  },
];
