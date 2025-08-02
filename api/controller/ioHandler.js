// This object will hold the state of the currently active poll.
let currentPoll = null;

const ioHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`${socket.id} connected.`);
    socket.join("pollRoom");

    // --- THIS IS THE FIX ---
    // This listener allows clients (like the teacher's results page) to
    // request the current poll data at any time.
    socket.on("get_current_poll", () => {
      if (currentPoll) {
        // Send the full poll data directly back to the client that asked for it.
        // This is crucial for the teacher's view.
        socket.emit("current_poll_data", currentPoll);
      }
    });

    socket.on("createPoll", (pollData) => {
      console.log("createPoll event received:", pollData);

      const endTime = Date.now() + pollData.timeLimit * 1000;

      currentPoll = {
        question: pollData.question,
        options: pollData.options,
        timeLimit: pollData.timeLimit,
        answers: {},
        isActive: true,
        endTime: endTime,
      };

      // Create a version of the poll for clients that doesn't include the correct answer.
      const pollForClients = {
        question: pollData.question,
        options: pollData.options.map(({ id, text }) => ({ id, text })),
        timeLimit: pollData.timeLimit,
        endTime: endTime,
      };

      io.to("pollRoom").emit("newPoll", pollForClients);
      console.log("Emitted newPoll to pollRoom.");

      setTimeout(() => {
        if (!currentPoll || !currentPoll.isActive) return;
        console.log("Timer ended. Calculating results.");
        currentPoll.isActive = false;

        const voteCounts = {};
        currentPoll.options.forEach((option) => {
          voteCounts[option.id] = 0;
        });
        Object.values(currentPoll.answers).forEach((optionId) => {
          if (voteCounts[optionId] !== undefined) voteCounts[optionId]++;
        });

        const correctOption = currentPoll.options.find((opt) => opt.isCorrect);
        const finalResults = {
          results: voteCounts,
          correctOptionId: correctOption ? correctOption.id : null,
        };

        io.to("pollRoom").emit("pollEnded", finalResults);
        console.log("Emitted pollEnded with results:", finalResults);
      }, pollData.timeLimit * 1000);
    });

    socket.on("submit_answer", (answerData) => {
      if (
        currentPoll &&
        currentPoll.isActive &&
        !currentPoll.answers[socket.id]
      ) {
        currentPoll.answers[socket.id] = answerData.optionId;

        const liveVoteCounts = {};
        currentPoll.options.forEach((option) => {
          liveVoteCounts[option.id] = 0;
        });
        Object.values(currentPoll.answers).forEach((optionId) => {
          if (liveVoteCounts[optionId] !== undefined)
            liveVoteCounts[optionId]++;
        });

        io.to("pollRoom").emit("update_results", liveVoteCounts);
      }
    });

    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected.`);
    });
  });
};

module.exports = ioHandler;
