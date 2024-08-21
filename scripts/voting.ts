import { ethers, network } from "hardhat";
const { moveBlocks } = require("../utils/move-blocks")


async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with account:", deployer.address,"\n");
    // @ts-ignore 0x5FbDB2315678afecb367f032d93F642f64180aa3 0x85e33128025E1dc1Ffb907bBA629F7D4ba843929
    const Voting = await ethers.getContract("Voting","0x85e33128025E1dc1Ffb907bBA629F7D4ba843929")
    console.log("voting...")
    // await voting
    // Example: Add a candidate
    // let tx = await Voting.addCandidate("Alice Modi", "Sabka Saath, Sabka Vikas", "Bharatiya Janata Party","adhaar1234");
    // await tx.wait();
    // console.log("Candidate Alice added");

    // Example: Register a voter
    // let tx = await Voting.registerAsVoter("Bob Kumar", "8690238281", "5678Aadhar", "bob@example.com");
    // await tx.wait();
    // console.log("Voter Bob registered");

    // setElectionDetails
    // let tx = await Voting.setElectionDetails("Mayank","Mayank@example.com","NO way!!!","CR election","IIIT Surat");
    // await tx.wait();
    // console.log("setElectionDetails successful!!")




    //  // Call the getter function
    // const adminAddress = await Voting.getAdmin();
    // const isVotingOpen = await Voting.isVotingOpen();
    // const getTotalCandidate = await Voting.getTotalCandidate();
    // const start = await Voting.getStart();
    // const getEnd = await Voting.getEnd();
    // const voterDetails = await Voting.getVoterDetails();
     // Set election details
    //  const txSetElection = await Voting.connect(deployer).setElectionDetails(
    //     "Admin Name",
    //     "admin@example.com",
    //     "Chief Election Officer",
    //     "General Elections 2024",
    //     "Election Commission"
    // );
    // await txSetElection.wait();
    // console.log("Election details set successfully.");

    // const startDate = Math.floor(Date.now() / 1000); // current time
    // const endDate = startDate + 86400; // + 1 day (in seconds)
    // const txSetVotingDates = await Voting.connect(deployer).setVotingDates(startDate, endDate);
    // await txSetVotingDates.wait();
    // console.log("Voting dates set successfully.");

    // Log the result
    // console.log("Admin Address: ", adminAddress);
    // console.log("txSetElection: ", txSetElection);
    // console.log("isVotingOpen: ", isVotingOpen);
    // console.log("getTotalCandidate: ", getTotalCandidate);
    // // console.log("Voter Details: ", voterDetails);
    // console.log("Start: ", start);
    // console.log("getEnd: ", getEnd);


    // Register a voter
    // const txRegisterVoter = await Voting.connect(deployer).registerAsVoter(
    //     "Alice",
    //     "1234567890",
    //     "aadhar1234",
    //     "alice@example.com"
    // );
    // await txRegisterVoter.wait();
    // console.log("Voter registered successfully.");

    // const txAddCandidate = await Voting.connect(deployer).addCandidate(
    //     "Bob",
    //     "Vote for Bob!",
    //     "Freedom Party",
    //     "aadhar5678"
    // );
    // await txAddCandidate.wait();
    // console.log("Candidate added successfully.");

    //  verify voter
    const verifyVoter = await Voting.connect(deployer).verifyVoter(true,"0x9f582979470b73C72F2EA7465F0A3c17Fc582D9f")
    await verifyVoter.wait();
    console.log("Voter verified successfully.");

    // Finally, voting
    const txVote = await Voting.connect(deployer).vote(0);
    await txVote.wait();
    console.log("Voted for candidate successfully.");

    // Tally votes
    const [winnerId, winningVoteCount] = await Voting.connect(deployer).tallyVotes();
    console.log(`Winner ID: ${winnerId}, Winning Vote Count: ${winningVoteCount}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
