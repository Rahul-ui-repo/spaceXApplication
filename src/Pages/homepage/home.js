//----------------------------------------------SpaceX Application-Sapient---------------------------------------
//--------------------------------------------------author- Rahul Shaw-------------------------------------------
import React, { Component } from 'react';
import './home.scss'
import './../commoncss/w3css.scss'
import classnames from 'classnames';
import { getData } from '../../util';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apihit: false,
            years: [],
            activeyear: null,
            launch: null,
            land: null,
            renderdata: [],
            apirunning: true,
        }
    }

    componentDidMount() {
        const datas = getData('https://api.spaceXdata.com/v3/launches?limit=100')
        datas.then((vals) => {
            console.log('vals', vals)
            let years = []
            for (let i = 0; i < vals.length; i++) {
                if (years.indexOf(vals[i].launch_year) === -1) {
                    years.push(vals[i].launch_year);
                    console.log(years)
                }
            }
            this.setState({ apihit: true, years: years, renderdata: vals, apirunning: false })

        })
    }

    activefilters = (category, val) => {
        console.log('enter')
        if (category === 'year') {
            if (this.state.activeyear === val.target.innerText) {
                this.setState({ activeyear: null }, () => this.callapi())
            }
            else {
                this.setState({ activeyear: val.target.innerText }, () => this.callapi())
            }
        }
        else if (category === 'launch') {
            if (this.state.launch === val) {
                this.setState({ launch: null }, () => this.callapi())
            }
            else {
                this.setState({ launch: val }, () => this.callapi())
            }
        }
        else {
            if (this.state.land === val) {
                this.setState({ land: null }, () => this.callapi())
            }
            else {
                this.setState({ land: val }, () => this.callapi())
            }
        }
    }

    callapi = () => {
        this.setState({ apirunning: true })
        let year = this.state.activeyear
        let launch = this.state.launch
        let land = this.state.land
        let initial = 'https://api.spaceXdata.com/v3/launches?limit=100'
        let onlyyear = year !== null ? '&launch_year=' + year : ''
        let onlylaunch = launch !== null ? '&launch_success=' + launch : ''
        let onlyland = land !== null ? '&land_success=' + land : ''
        // let allfilters = '&launch_success='+launch+'&land_success='+land+'&launch_year='+year
        let urlbuild = initial + onlyyear + onlylaunch + onlyland
        console.log('urlbuild', urlbuild)
        const datas = getData(urlbuild)
        datas.then((vals) => {
            console.log('vals', vals)
            this.setState({ apirunning: false, renderdata: vals })
        })

    }


    render() {
        const years = this.state.years.length > 0 ? this.state.years.map((year) => {
            return <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                <p className={classnames('w3-animate-zoom', this.state.apirunning === false ? 'content' : 'contentcursor', this.state.activeyear === year ? 'content-active' : null)}
                    onClick={(event) => { this.activefilters('year', event) }}>{year}</p>
            </div>
        }) : ""

        const rocketdata = this.state.renderdata.length > 0 ? this.state.renderdata.map((data) => {
            return <div className='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
                <div className='rocketdata w3-animate-zoom'>
                    <div className='row w3-animate-zoom'>
                        <img src={data.links.mission_patch_small} alt="rocket" />
                    </div>
                    <div className='data w3-animate-zoom'>
                        <p className='name'>{data.mission_name} #{data.flight_number}</p>
                        <p className='missiondata'>Mission IDs: <br />
                            {data.mission_id.length !== 0 ? data.mission_id.map((mission) => { return <ul><li className='vals'>{mission}</li></ul> }) : <ul><li className='vals'>ID Not Available</li></ul>}
                        </p>
                        <p className='missiondata'>Launch Year: <span className='vals'>{data.launch_year}</span></p>
                        <p className='missiondata'>Successful Launch: <span className='vals'>{data.launch_success === true ? 'True' : data.launch_success === false ? 'False' : 'Status Not Available'}</span></p>
                        {/* <p className='missiondata'>Successful Landing: <span className='vals'>{data.launch_success}</span></p> */}

                    </div>
                </div>
            </div>

        }) : ""


        return (
            <html>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"></meta>
                {this.state.apihit === true ?
                    <div className="home animatecss">
                        <p className='pageheading'>SpaceX Launch Programs</p>
                        <div className='col-xs-12 col-sm-12	col-md-12 col-lg-12 pagebody'>
                            <div className="filters col-xs-12 col-md-2 col-lg-2">
                                <p style={{ paddingTop: '4%' }}><b><center>Filters</center></b></p>
                                <p className='heads'><u>Launch Year</u></p>
                                <div className="row flex-container">
                                    {years}
                                </div>
                                <p className='heads'><u>Successful Launch</u></p>
                                <div className="row flex-container" >
                                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                        <p className={classnames('w3-animate-zoom', this.state.apirunning === false ? 'content' : 'contentcursor', this.state.launch === true ? 'content-active' : null)} onClick={() => { this.activefilters('launch', true) }}>
                                            True
                                         </p>
                                    </div>
                                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                        <p className={classnames('w3-animate-zoom', this.state.apirunning === false ? 'content' : 'contentcursor', this.state.launch === false ? 'content-active' : null)} onClick={() => { this.activefilters('launch', false) }}>
                                            False
                                        </p>
                                    </div>
                                </div>
                                <p className='heads'><u>Successful Landing</u></p>
                                <div className="row flex-container" >
                                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                        <p className={classnames('w3-animate-zoom', this.state.apirunning === false ? 'content' : 'contentcursor', this.state.land === true ? 'content-active' : null)} onClick={() => { this.activefilters('land', true) }}>
                                            True
                                         </p>
                                    </div>
                                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                        <p className={classnames('w3-animate-zoom', this.state.apirunning === false ? 'content' : 'contentcursor', this.state.land === false ? 'content-active' : null)} onClick={() => { this.activefilters('land', false) }}>
                                            False
                                        </p>
                                    </div>
                                </div>

                            </div>
                            {this.state.apirunning === false ? this.state.renderdata.length > 0 ?
                                <div className='col-xs-12 col-sm-6 col-md-10 col-lg-10'>
                                    <div className='row flex-container'>
                                        {rocketdata}
                                    </div>
                                </div> :
                                <div style={{ margin: 'auto', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>No Data Found <br /> Please change Filter options.</div> : <div class="loader">
                                </div>}
                        </div>
                        <p className='pageend'> <div class="container">Developed by: <b>Rahul Shaw</b></div></p>
                    </div> : <div className='col-xs-12 col-sm-12	col-md-12 col-lg-12'><div class="loader"></div></div>}
            </html>
        )
    }
}

export default Home;