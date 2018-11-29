pragma solidity ^ 0.4.24;

contract token {
    address public _owner;
    uint public decimals =18;
    string public symbol ="CDS";
    uint public noOfTokensPerEth;
    uint public totalFund;
    uint public targetAmount;
    bool crowdsaleClosed = false;
    // test 
    uint public amountRaised;
    event FundTransfer(address _to, uint _tokens, bool isContribution);
    event Transfer(address _from,address _to,uint _ether);
    mapping (address => uint)balances;
    function token(uint _totaltokens,uint noOfTokensPerEther,uint amount)public{
        balances[msg.sender] = _totaltokens;
        targetAmount = amount;
        noOfTokensPerEth = noOfTokensPerEther;
    }
    function balanceOf(address _owner) public returns(uint){
        return balances[_owner];
    }
        event FundTransfer1(address, uint, bool);
    function () payable external {
        require(!crowdsaleClosed);
        uint amount = msg.value;
        balances[msg.sender] += amount;
        amountRaised += amount;
        balances[msg.sender] -= msg.value;
        
           
       emit FundTransfer1(msg.sender, amount, true);
    }


    
    function isOwned() public {
        _owner =msg.sender;
    }
    function getEther(address _to,uint _ether) public returns(bool success){
        require(!crowdsaleClosed);
        if(balances[_to]>0 && _ether > 0 && _ether <=10){
            totalFund += _ether;
            uint tempToken = _ether * noOfTokensPerEth;
            transferTokens(_to,tempToken);
            emit FundTransfer(_to,_ether,true);
            return true;
        }
        else {
            return false;
        }
    }
    
     // Transfer function
    function transferTokens(address _to,uint _tokens) public returns (bool success) {
        if (balances[msg.sender] >= _tokens && _tokens > 0 ) {
            balances[msg.sender] -= _tokens;
            balances[_to] += _tokens;
            emit Transfer(msg.sender,_to,_tokens);
            return true;
        } else { return false; }
    }//function ends 

}