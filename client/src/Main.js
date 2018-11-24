import ApiService from './services/ApiService';
import React, { Component } from 'react';
import crypto from 'crypto';
import crc32 from 'crc/crc32';
import Dropzone from 'react-dropzone';
import { Button, ProgressBar, ButtonToolbar } from 'react-bootstrap';
import { Line, Circle } from 'rc-progress';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {isConnected: false,
                      uploadStatus: 0,
                      hashValue:null,
                      crc32Value: null,
                      fileOwner: null};
        this.setStateValue = this.setStateValue.bind(this);


    }
    componentWillMount() {


    }

    setStateValue(key, value) {
        this.setState({[key]: value});

    }

    async componentDidMount(){
        // await this.initWeb3Connection();
        ApiService.getBalance();


    }

    async initWeb3Connection() {
        // const web3 = window.web3;
        // Get network provider and web3 instance.

    }


    registerAsset(assetID)
    {

        try {

        }

        catch (err) {
            console.log(err);
        }

    }


    queryAsset(assetID)
    {


        try {
            console.log(assetID);

        } catch (err) {
            console.log(err);
        }
    }

    calculateHash(file){
        this.setState({uploadStatus:25});
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            const hashValue = crypto.createHash('md5').update(fileAsBinaryString).digest("hex");
            const crc32Value = crc32(fileAsBinaryString);
            this.setState({hashValue: hashValue,
                           crc32Value: crc32Value,
                           fileOwner: null,
                           uploadStatus:99});

        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file[0]);

    }


    render() {
        return (
            <div style={{display: "flex", alignItems: "center",
                justifyContent: "center", flexDirection: "column",
                "padding": 100}}>


                <Dropzone
                    onDrop={this.calculateHash.bind(this)}

                >
                    <p>Try dropping some files here, or click to select files to upload.</p>
                </Dropzone>
                {this.state.uploadStatus > 0 && this.state.uploadStatus < 100?
                    <Line percent={this.state.uploadStatus} strokeWidth="1" style={{margin: "5%", width: "30%"}}/> : null

                }

                {this.state.hashValue ? <div> <b>File hash value</b>: <code>{this.state.hashValue}</code></div> : null

                }
                {this.state.fileOwner ? <div> <b>Current owner</b>: <code>{this.state.fileOwner}</code></div> : null

                }


                <ButtonToolbar  style={{margin: "5%"}}>
                <Button bsStyle="primary" bsSize="large" active
                        disabled={!this.state.hashValue}
                        onClick={(e) => ApiService.registerAsset(this.state.crc32Value, "alice")}>
                    Register file
                </Button>
                    <Button bsStyle="primary" bsSize="large" active
                            disabled={!this.state.hashValue}
                            onClick={(e) => ApiService.queryAsset(this.state.crc32Value, this.setStateValue)}>
                        Check owner
                    </Button>
                </ButtonToolbar>






            </div>
    );
    }
}
export default Main;