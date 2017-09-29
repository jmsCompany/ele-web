(function($, window, document,undefined) {


     $clientURL = "http://118.178.94.7:9997/ele/"
    //  $clientURL = "http://localhost:9997/ele/"
    // $clientURL = "http://192.168.1.102:9997/ele/"

	//$.fn.dataTable.ext.errMode = 'throw';

    $.JMSClient = function (path,opt,callback) {
      var defaults = {
                     'url':        $clientURL+path,
                     'type':        'GET',
                     'dataType':    'json',
                     'contentType': 'application/json; charset=UTF-8',
                     'data':         {},
                     headers:      {},
                     processData:   true

        };
     var options = $.extend({}, defaults, opt);
        //hxg 兼容上传文件操作
       $.ajax({
            url:          options.url,
            type:         options.type,
            dataType:     options.dataType,
            contentType:  options.contentType,
            data:         options.data,
            headers:      options.headers,
            processData:  options.processData,
		    beforeSend:function(XMLHttpRequest){
		    	$('#body-center').block({
				    message: '数据加载中。。。',
                   	css: {
						border: 'none',
						padding: '15px',
						backgroundColor: '#000',
						'-webkit-border-radius': '10px',
						'-moz-border-radius': '10px',
						opacity: .5,
						color: '#fff'
                    }
		    	});
		    },
         	error: function(XMLHttpRequest, textStatus, errorThrown) {
               $('#body-center').unblock();
               //  alert(XMLHttpRequest.status);
               //  alert(textStatus);
              //   alert('error');
            },
         	complete:function(XMLHttpRequest, textStatus){
         		$('#body-center').unblock();
           	},
            success: function(data, textStatus){
                $('#body-center').unblock();
                callback && callback(data);
            }
        });
    };

    //在插件中使用Select对象
    $.fn.selectautofill = function(path,options,callback) {
        var t = this;
        $.JMSClient(path,options,function(data){
        	t.empty();
            $(data).each(function(i, val){
                t.append($('<option value='+val.id+'>'+val.name+'</option>'));
            });

            //加一个异步操作
			if(callback && typeof callback == 'function') {
				callback(data);
			}
        });
    };

     //scroll
     $.jmsscroll = function(path,pagerequest,jmstoken,callback){
            $.JMSClient(path,{'type':'POST',data:pagerequest,headers:{'JMS-TOKEN':jmstoken}},callback);


     };

     //检查jms-token是否过期
     $.checktoken = function(jmstoken,callback){
            $.JMSClient('check/jmstoken',{data:{jmstoken:jmstoken}},callback);

     };

     //0. 登录
     $.login = function(wsUser,callback){
             $.JMSClient('login',{'type':'POST',data:wsUser},callback);

     };

     //保存字典
     $.saveDic = function(data,callback){
		  $.JMSClient('sys/dic/saveDic',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
     };

     //保存流程
     $.saveSteps = function(data,callback){
		  $.JMSClient('sys/steps/saveSteps',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存员工
     $.saveUser = function(data,callback){
		  $.JMSClient('sys/user/saveUser',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存员工密码
     $.saveUserPwd = function(data,callback){
		  $.JMSClient('sys/user/updateUserPasswordByAdmin',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存消息
     $.saveNoti = function(data,callback){
		  $.JMSClient('sys/noti/saveNoti',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

     //保存区域
     $.saveLocation = function(id,code,callback){
		  $.JMSClient('sys/location/changeStatus',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:'subSubLocationId='+id+'&enabled=1&code='+code},callback);
      };

    //保存区域
    $.deleteLocation = function(id,callback){
        $.JMSClient('sys/location/changeStatus',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:'subSubLocationId='+id+'&enabled=1'},callback);
    };

     //保存权限
     $.savePermission = function(data,callback){
		  $.JMSClient('sys/role/saveRolePermissions',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //保存签字
      $.saveSign = function(data,callback){
      $.JMSClient('sys/sign/saveSignWorkflowSteps',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //保存项目
      $.saveProj = function(data,callback){
		//  debugger;
      $.JMSClient('project/saveProject',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };
      //保存项目进度
      $.saveProjSteps = function(data,callback){
      $.JMSClient('project/saveProjectSteps',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //保存表单
      $.saveForm = function(formId,data,callback){
      $.JMSClient('project/saveForm'+formId,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //读取表单
      $.readForm = function(formId,projId,callback){
      $.JMSClient('project/getForm'+formId,{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projectId:projId}},function(data){callback(data)});
      };

      //保存销售跟踪单
      $.saveSaleForm = function(data,callback){
      $.JMSClient('project/saveSoTrack',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
      };

      //读取销售跟踪单
      $.readSaleForm = function(projId,callback){
      $.JMSClient('project/getSoTrack',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projectId:projId}},function(data){callback(data)});
      };

     //删除字典
     $.delDic = function(id,callback){
		  $.JMSClient('sys/dic/deleteDic',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{dicId:id}},callback);
      };

     //删除流程
     $.delSteps = function(id,callback){
		  $.JMSClient('sys/steps/deleteSteps',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{stepsId:id}},callback);
      };

     //删除员工
     $.delUser = function(id,callback){
		  $.JMSClient('sys/user/deleteUsers',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{username:id}},callback);
      };

     //删除区域
     $.delLocation = function(id,callback){
      $.JMSClient('sys/location/deleteLoc',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{subSubLocationId:id, enabled:0}},callback);
      };

     //删除签字
     $.delSign = function(id,callback){
      $.JMSClient('sys/sign/deleteSignWorkflowStep',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{signWorkflowStepId:id}},callback);
      };

     //删除项目
     $.delProj = function(id,callback){
		  $.JMSClient('project/deleteProject',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{idProject:id}},callback);
      };


	//用户自己保存密码
	$.saveUserPassword1=function(userPassword,jmstoken,callback){
		$.JMSClient('sys/user/updateUserPassword',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:userPassword},callback);
	};






     //NEW-END




	$.signsubmit=function(data,jmstoken,callback){
		$.JMSClient('sys/sign/saveSignEvent',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.getStepBtns=function(data,jmstoken,callback){
		$.JMSClient('project/getProjectStepStatus',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projId:data}},callback);
	}
	$.finishStep=function(data,jmstoken,callback){
		$.JMSClient('project/finishProjectStep?proStepId='+data,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:{}},callback);
	}
	$.getUserJob=function(data,jmstoken,callback){
		$.JMSClient('sys/user/userRoles',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.saveUserRoles=function(data,jmstoken,callback){
		$.JMSClient('sys/user/saveUserRoles',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.customerTable=function(data,jmstoken,callback){
		$.JMSClient('project/customerTable',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.openAccount=function(data,jmstoken,callback){
		$.JMSClient('sys/customer/openAccount?projId='+data,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:{}},callback);
	}
	$.disabledUsersAccount=function(data,jmstoken,callback){
		$.JMSClient('sys/customer/disabledUsersAccount?projId='+data,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:{}},callback);
	}
	$.updateUsersPassword=function(data,jmstoken,callback){
		$.JMSClient('sys/customer/updateUsersPasswordByProjectId',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.saveDevice=function(data,jmstoken,callback){
		$.JMSClient('project/saveDevice',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.findCustomerDeviceById=function(data,jmstoken,callback){
		$.JMSClient('project/findCustomerDeviceById',{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
	}
	$.deleteCustomerDevice=function(data,jmstoken,callback){
		$.JMSClient('project/deleteCustomerDevice?deviceId='+data,{'type':'POST',headers:{'JMS-TOKEN':jmstoken},data:{}},callback);
	}

    //发起项目表单1签字
    $.startSign=function(data,jmstoken,callback){
        $.JMSClient('/project/startSignForm1',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projId:data}},callback);
    }
   //发起项目表单2签字
    $.startSign2=function(data,jmstoken,callback){
        $.JMSClient('/project/startSignForm2',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:{projId:data}},callback);
    }
    //销售跟踪单的更改状态   
    $.saleTracking=function(data,jmstoken,callback){
        $.JMSClient('/project/changeProjectStatus',{'type':'GET',headers:{'JMS-TOKEN':jmstoken},data:data},callback);
    }



})(jQuery, window, document);
