import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View, Text, Image } from "react-native";
import PropTypes from "prop-types";

import * as Animatable from "react-native-animatable";

import LinePinVisualizer from "./LinePinVisualizer";

import style from "./HeaderFragment.style";

import lockIcon from "../../assets/lock.png";
import successIcon from "../../assets/lock.png";

var intrvl;
class HeaderFragment extends Component {
  constructor(props) {
    super(props);
    this.state={remaining:60,attempts: 0}
    this.wait.bind;
    
  }

  static State = {
    Default: 0,
    Reenter: 1,
    Success: 2,
    Error: 3,
    Blocked: 4
  };

  static propTypes = {
    ...ViewPropTypes,

    defaultState: PropTypes.object,
    reenterState: PropTypes.object,
    successState: PropTypes.object,
    errorState: PropTypes.object,
    blockState: PropTypes.object,

    state: PropTypes.number,
    dots: PropTypes.number,
    dotsLimit: PropTypes.number,
    enableDots: PropTypes.bool
  };

  static defaultProps = {
    defaultState: {
      title: "Enter a passcode",
      titleStyle: style.defaultTitleStyle,
      icon: lockIcon,
      dotProps: {
        style: {
          backgroundColor: "#FFFFFF"
        }
      }
    },

    reenterState: {
      title: "Re-enter passcode to verify",
      titleStyle: style.reenterTitleStyle,
      icon: lockIcon,
      dotProps: {
        style: {
          backgroundColor: "#FFFFFF"
        }
      }
    },

    successState: {
      title: "Authorized",
      titleStyle: style.successTitleStyle,
      icon: successIcon,
      dotProps: {
        style: {
          backgroundColor: "#037d50",
          borderColor: "#037d50"
        }
      }
    },

    errorState: {
      title: "Passcode do not match",
      titleStyle: style.errorTitleStyle,
      icon: lockIcon,
      dotProps: {
        style: {
          backgroundColor: "#be0000",
          borderColor: "#be0000"
        }
      }
    },

    blockState: {
      title: `Please wait`,
      titleStyle: style.errorTitleStyle,
      icon: lockIcon,
      dotProps: {
        style: {
          backgroundColor: "#be0000",
          borderColor: "#be0000"
        }
      }
    },

    state: 0,
    dots: 0,
    enableDots: true
  };

  _renderState=()=> {
    if (this.props.renderState) return this.props.renderState();
    let props;
    console.log(this.props, this.props.state)
    switch (this.props.state) {
      case HeaderFragment.State.Default:
        props = HeaderFragment.defaultProps.defaultState;
        if (this.props.defaultState) {
          props = Object.assign(props, this.props.defaultState);
        }
      case HeaderFragment.State.Reenter:
        props = HeaderFragment.defaultProps.reenterState;
        if (this.props.reenterState) {
          props = Object.assign(props, this.props.reenterState);
        }
        break;
      case HeaderFragment.State.Success:
        props = HeaderFragment.defaultProps.successState;
        if (this.props.successState) {
          props = Object.assign(props, this.props.successState);
        }
        break;
      case HeaderFragment.State.Error:
        props = HeaderFragment.defaultProps.errorState;
        if (this.props.errorState) {
          props = Object.assign(props, this.props.errorState);
        }
        break;
      case HeaderFragment.State.Blocked:
        props = HeaderFragment.defaultProps.blockState;
        if (this.props.blockState) {
          props = Object.assign(props, {...this.props.blockState,title: `Please wait ${this.state.remaining} seconds`} );
        }
        break;
      }
      return this.renderState({ ...props });
  }

  renderState=(props)=> {
    return (
      <View style={style.circleGroup}>
        <View style={style.circleContainer}>
          <View style={style.circle}>
            <Image source={props.icon} style={style.circleIcon} />
          </View>
        </View>
        <Text style={props.titleStyle}>{props.title}</Text>
      </View>
    );
  }
  
  _renderPasscodeVisualizer() {
    let {
      dots,
      dotsLimit,
      backgroundColor,
      defaultState,
      reenterState,
      successState,
      errorState,
      renderPasscodeVisualizer,
      state,
      enableDots
    } = this.props;

    if (renderPasscodeVisualizer) return renderPasscodeVisualizer();

    let renderVisualizer = props => {
      let styles = [style.passcodeVisualizerContainer];
      if (backgroundColor) {
        styles.push({ backgroundColor: backgroundColor });
      }

      return (
        <View style={styles}>
          {/* <Animatable.View
            ref={ref => {
              this.view = ref;
            // }}
          > */}
          {enableDots && (
            <LinePinVisualizer
              dotsLimit={dotsLimit}
              dots={dots}
              style={[props.style]}
              {...props}
            />
          )}
          {/* </Animatable.View>; */}
        </View>
      );
    };

    let dotProps;
    switch (state) {
      case HeaderFragment.State.Default:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.defaultState.dotProps
        );
        if (defaultState && defaultState.dotProps) {
          dotProps = Object.assign(dotProps, defaultState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
      case HeaderFragment.State.Reenter:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.reenterState.dotProps
        );
        if (defaultState && reenterState.dotProps) {
          dotProps = Object.assign(dotProps, reenterState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
      case HeaderFragment.State.Success:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.successState.dotProps
        );
        if (defaultState && successState.dotProps) {
          dotProps = Object.assign(dotProps, successState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
      case HeaderFragment.State.Error:
        dotProps = Object.assign(
          {},
          HeaderFragment.defaultProps.errorState.dotProps
        );
        if (defaultState && errorState.dotProps) {
          dotProps = Object.assign(dotProps, errorState.dotProps);
        }

        return renderVisualizer({
          dotProps: { ...dotProps }
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.state === HeaderFragment.State.Error &&
      prevProps.state !== HeaderFragment.State.Error
    ) {
      // this.view.shake(800);
    }
    // if(this.state.attempts >  1){
    //   i
    //   }
    if(this.props.state === 3 && this.state.attempts===0){
      this.setState({attempts:this.state.attempts+1})
    }
    if(this.state.attempts===1 && this.state.remaining === 60){
      console.log("limit reached", this.state);
      setInterval(()=>{
        console.log("2122")
        // let props = HeaderFragment.defaultProps.blockState;
        // console.log("setting interval","remaining time", this.state.remaining)
        // if(this.state.remaining>0){
        //   console.log("reduce remaining time")
        //   this.setState({remaining: this.state.remaining-1})
        //   console.log("state updated")
        //   props = Object.assign(props, {...this.props.blockState,title: `Please wait ${this.state.remaining} seconds`});
        //   console.log("updating message", props)
        //   // this.renderState({ ...props });
        // }else{
        //   console.log("clearing interval")
        //   clearInterval(intrvl)
        //   this.setState({
        //     remaining: 60,
        //     attempts:0
        //   });
        // }
      },1000)
    }
  }

  wait = ()=>{
    let props = HeaderFragment.defaultProps.blockState;
    console.log("setting interval","remaining time", this.state.remaining)
    if(this.state.remaining>0){
      console.log("reduce remaining time")
      this.setState({remaining: this.state.remaining-1})
      console.log("state updated")
      props = Object.assign(props, {...this.props.blockState,title: `Please wait ${this.state.remaining} seconds`});
      console.log("updating message", props)
      // this.renderState({ ...props });
    }else{
      console.log("clearing interval")
      clearInterval(intrvl)
      this.setState({
        remaining: 60,
        attempts:0
      });
    }
  }

  render() {
    let { backgroundColor } = this.props;
    let styleProps = this.props.style;

    let styles = [style.container, styleProps];
    if (backgroundColor) {
      styles.push({ backgroundColor: backgroundColor });
    }

    return (
      <View style={styles}>
        {this._renderState()}
        {this._renderPasscodeVisualizer()}
      </View>
    );
  }

}

export { HeaderFragment };
