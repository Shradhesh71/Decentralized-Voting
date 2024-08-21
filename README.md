# Sample Hardhat Voting Project

- add Candidate
- add Voter
- verified voter
- vote
- set Election detial

- deploy voting

-testing
 -unit  fo locally
 -staging for done as a testnet

 yarn hardhat coverage



 

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```


# implementation later
struct ElectionDet {
        address deployedAddress;
        string el_n;
        string el_d;
    }
    
    mapping(string=>ElectionDet) companyEmail;
    
    function createElection(string memory email,string memory election_name, string memory election_description) public{
        address newElection = new Election(msg.sender , election_name, election_description);
        
        companyEmail[email].deployedAddress = newElection;
        companyEmail[email].el_n = election_name;
        companyEmail[email].el_d = election_description;
    }
    
    function getDeployedElection(string memory email) public view returns (address,string,string) {
        address val =  companyEmail[email].deployedAddress;
        if(val == 0) 
            return (0,"","Create an election.");
        else
            return (companyEmail[email].deployedAddress,companyEmail[email].el_n,companyEmail[email].el_d);
    }