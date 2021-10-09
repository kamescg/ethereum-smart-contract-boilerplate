import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Signer } from '@ethersproject/abstract-signer';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract, ContractFactory } from 'ethers';

const { getSigners, utils } = ethers;
const { parseEther: toWei } = utils;

describe('PrizeTierHistory', () => {
    // WALLETS
    let wallet1: SignerWithAddress;
    let wallet2: SignerWithAddress;
    let wallet3: SignerWithAddress;
    let wallet4: SignerWithAddress;

    // FACTORIES
    let StakeTokenFactory: ContractFactory

    // CONTRACTS
    let stakeToken: Contract
    let stakeTokenOwner: Contract
    let stakeTokenUnauthorized: Contract

    before(async () => {
        [wallet1, wallet2, wallet3, wallet4] = await getSigners();
        StakeTokenFactory = await ethers.getContractFactory('StakeToken');
    });

    beforeEach(async () => {
        stakeToken = await StakeTokenFactory.deploy()
        stakeTokenOwner = stakeToken.connect(wallet1 as Signer)
        stakeTokenUnauthorized = stakeToken.connect(wallet4 as Signer)
    })

    describe('Core', () => {
        describe('.deposit()', () => {
            it('should succeed to...', async () => {
                await expect(stakeToken.withdraw())
                    .to.emit(stakeToken, "Deposit")
            })

            it('should fail to...', async () => {

            })
        })

        describe('.withdraw()', () => {
            it('should succeed to...', async () => {
                await expect(stakeToken.withdraw())
                    .to.emit(stakeToken, "Withdraw")
            })

            it('should fail to...', async () => {

            })
        })
    })

    describe('Setters', () => {
        it('should succeed to set...', async () => {

        })
    })

    describe('Getters', () => {
        it('should succeed to get...', async () => {

        })
    })
})