import {
    frontEndContractsFile,
    frontEndAbiLocation,
} from "../helper-hardhat-config"
require("dotenv").config()
import fs from "fs"
import { network, ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { Contract } from "ethers"

const updateFrontEnd: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment,
) {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}
// hre.ethers.getContract<Contract>
async function updateAbi() {
    try {
        // @ts-ignore
        const Voting = await ethers.getContract("Voting")
        fs.writeFileSync(
            `${frontEndAbiLocation}Voting.json`,
            Voting.interface.format(ethers.utils.FormatTypes.json),
        )
        // @ts-ignore
        const Migrations = await ethers.getContract("Migrations")
        fs.writeFileSync(
            `${frontEndAbiLocation}Migrations.json`,
            Migrations.interface.format(ethers.utils.FormatTypes.json),
        )
        console.log("JSON updateAbi Completed")
    } catch (error: any) {
        console.log(error)
    }
}

async function updateContractAddresses() {
    try {
        console.log(network.config.chainId!)
        const chainId = network.config.chainId!.toString()
        // const chainId = "31337"
        // @ts-ignore
        const Voting = await ethers.getContract("Voting")
        // console.log(Voting) //work fine
        const contractAddresses = JSON.parse(
            fs.readFileSync(
                "../frontend/constants/networkMapping.json",
                "utf8",
            )!,
        )
        // console.log(contractAddresses)
        if (chainId in contractAddresses) {
            if (
                !contractAddresses[chainId]["Voting"].includes(Voting.address)
            ) {
                contractAddresses[chainId]["Voting"].push(Voting.address)
            }
        } else {
            contractAddresses[chainId] = {
                Voting: [Voting.address],
            }
        }
        fs.writeFileSync(frontEndContractsFile, JSON.stringify(Voting))
        console.log("updateContractAddresses!!!");
    } catch (error: any) {
        console.log("error: ",error)
    }
}

export default updateFrontEnd
updateFrontEnd.tags = ["all", "frontend"]
