const contractAddress = "0x63f4d47CfD3bbDe8265d407A7Cd862c190401582";

const ABI = [
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
];

function setCookie(name, value){
    const d = new Date();
    d.setTime(d.getTime() + (2*24*60*60*1000)); // 2 days
    let expires = "expires="+ d.toUTCString();
    document.cookie = name+"="+value+";"+expires+";path=/";
    return;
}

function getCookie(name){
    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i=0; i<ca.length; i++){
        let c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

const deleteCookie = async (name) =>{
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return;
}

const checkLogin = async () => { 
    let userStatus = false;
    await ethereum.request({method: "eth_requestAccounts"}).catch((err) => {
        if(err.code === -32002)
        {
            $('.loginDub').show();
            $('#bannerBuyNow').hide();
        }
    });
}

const getAccount = async () => {
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    return accounts[0];
}

const logout = async () => {  
    if (window.ethereum) {
        // Request Metamask to clear accounts
        await window.ethereum.request({ 
            method: 'wallet_revokePermissions', 
            params: [
                {
                    eth_accounts: {},
                },
            ], 
        }).then((response) => {
            deleteCookie("loggedIn");
        }).catch((error) => {
            console.error(error);
        });
    }
}

  const getBalance = async () => { // const getBalance is the HTML function & .contract.getBalance is the smart contract function
    
    window.web3 = new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
    
    const data = await window.contract.methods.getBalance().call();
    const ETHBalance = window.web3.utils.fromWei(data, "ether");
    $('#smartContractBalance').empty().append(`Current Smart Contract Balance: ${ETHBalance} ETH`);
  }

  const deposit = async (account) => {
    
    const amount = $("#depositAmount").val();
    if(amount!==''){
        window.web3 = new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
        const amountInWei = window.web3.utils.toWei(amount, "ether");
        $('#preloader').show();

      try {
        await window.contract.methods.deposit().send({ from: account, value: amountInWei }).then((response) => {
            alert('Success');
            location.reload();
        });
        
      } catch (error) {

        alert('failed to deposit');
        location.reload();
      }

    }else{
        alert('Please enter the amount to deposit');
    }
    
  }

  const withDraw = async (amount, address, account) => {
    window.web3 = new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
    // Convert Ether amount to Wei
    const amountInWei = window.web3.utils.toWei(amount.toString(), "ether");
    $('#preloader').show();

    // Withdraw the amount from the contract
    try {
      const result= await window.contract.methods
      .withdraw(address, amountInWei)
      .send({ from: account })
      .then((response) => {
        alert("successful");
        location.reload();
      });
      
    } catch (error) {
      alert("Withdraw failed!");
      location.reload();
    }
    

  };

  const placeOrder = async (price, account) => {
    //   connect the contract with window
    window.web3 = new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, contractAddress);
    const priceWei = window.web3.utils.toWei(String(price), 'ether');
    // deposit the amount in to the contract
    $('#preloader').show();
    try {
      await window.contract.methods
      .deposit()
      .send({ from: account, value: priceWei })
      .then((response) => {
        alert("Order placed successfully!");
        deleteCookie("cart");
        location.reload();
      });
      
    } catch (error) {
      alert("Order Failed!");
      location.reload();
    }
   
  };


$(document).ready(function(){
    // ethereum account changed event listener
    if(typeof window.ethereum !== "undefined")
    {
        window.ethereum.on("accountsChanged", function(accounts){
            setCookie("loggedIn", "true");
            location.reload();
        });

        //  check if user is logged in
        if(getCookie("loggedIn") == "true")
        {
            getAccount().then((account) => {
                $('#cartNav').show();
                $('#manageWallet').show();
                $('#login').hide();
                $('#logout').show();
                $('#contentDisplay').show();
            });
        }
    }

    if (typeof window.ethereum == "undefined") {
        $('#login').hide();
        deleteCookie("loggedIn");
        $('#bannerBuyNow').hide();
        $('#installMetamask').show();
    }

    $('#login').click(function(){
        checkLogin();
    });

    $('#logout').click(function(){
        logout();
    });

    // methods
    $('#metamaskAccount').click(function(e){
        e.preventDefault();
        getAccount().then((myAccount) => {
            $(this).empty().append(`My Metamask Account Address: ${myAccount}`);
        });
        

    })

    $('#smartContractAddress').click(function(e){
        e.preventDefault();
        $(this).empty().append(`Deployed Smart Contract Address: ${contractAddress}`);
    });

    $('#smartContractBalance').click(function(e){
        e.preventDefault();
        getBalance();
    });

    $('#deposit').click(function(e){
        e.preventDefault();
        getAccount().then((myAccount) => {
            deposit(myAccount);
        });
    });

    $('#withdraw').click(function(e){
        e.preventDefault();
        getAccount().then((myAccount) => {
            var address= $('#address').val();
            var eth= $('#eth').val();
            if(eth == "" || address == ""){
                alert("Amount and Address are required!");
            }
            withDraw(eth, address, myAccount);
        });
    });

    $(".final-price-button").on("click", function () {
        // get the price
        var price = $(this).attr("data-price");
        getAccount().then((myAccount) => {
            placeOrder(price, myAccount);
        });
    });

    $('.disabledForm').submit(function(e){
        e.preventDefault();
    });
});