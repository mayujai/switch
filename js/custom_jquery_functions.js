function UpdateAjaxDropDown(els,elt)
	{
		if($(els).length && $(elt).length && $(els).length>0 && $(elt).length>0)
		{
		    var source_name=$(els).attr("name");
		    if($(els).data('check_val') && $(els).data('check_val')!="")
		    {
		        var check_param=$(els).data('check_val');
		    }else
		    {
		        var check_param=source_name;
		    }
		    if($(elt).data("selected-attr") && $(elt).data("selected-attr").length && $(elt).data("selected-attr").length>0)
		    {
		    	var selected_attr=$(elt).data("selected-attr");
		    }else
		    {
		    	var selected_attr="";
		    }
		    if($(elt).data("selected-val") && $(elt).data("selected-val").length && $(elt).data("selected-val").length>0)
		    {
		    	var selected_val=$(elt).data("selected-val");
		    }else
		    {
		    	var selected_val="";
		    }
		    var method="POST";
		    var submit_val=$(els).val();
		    var url="process/ajax_action_php_function.php";
		    var action=$(els).data('action');
		    if(submit_val!="")
		    {
		        var form_data={};
		        form_data[check_param]=submit_val;
		        form_data['action']=action;
		        if(selected_attr!="" && selected_val!="")
		        {
		        	form_data[selected_attr]=selected_val;
		        }
		        //console.log(form_data)
		        $.ajax({
		            type: method,
		            url: url,
		            data: form_data,
		            success: function (data) {
		            	if(data!="")
		            	{
		            		//console.log(data);
		            		data=JSON.parse(data);
		            		//console.log(data);	
		            		if(data.error_code!="0")
		            		{
		            			$(elt).html(data.data);
		            		}
		            	}
		            }
			    });     

		    }
		}
	}

	function RemoveProductImages(id_img,id_product) 
	{
	    swal({
            title: 'Are you sure to delete this image?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a5dc86',
            cancelButtonColor: '#d57171',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
	        $.ajax({
	            url: 'process/ajax_action_php_function.php',
	            type: 'POST',
	            data: {
	                id_img: id_img,
	                id_product: id_product,
	                action:'RemoveProductImages'
	            },
	            error: function() {
	                swal(
                      	{
                          title: 'Error',
                          text: 'Error in image removal process.',
                          type: 'error',
                          confirmButtonColor: '#4fa7f3'
                      	}  ); 
	            },
	            success: function(data) {
	                if (data = 'done') {
	                    $('.proli_' + id_img).hide();
	                    swal(
                      	{
                          title: 'Success',
                          text: 'Image removed successfully.',
                          type: 'success',
                          confirmButtonColor: '#4fa7f3'
                      	}  ); 
	                } else {
	                    swal(
                      	{
                          title: 'Error',
                          text: 'Error in image removal process.',
                          type: 'error',
                          confirmButtonColor: '#4fa7f3'
                      	}  ); 
	                }
	            }
	        });
	    });
	}
	function SetEqualHeight(class_name)
	{
	      var total_partners=$("."+class_name).length;
	      var height_arr=[];
	      for(var i=0;i<total_partners;i++)
	      {
	            height_arr[i]=$("."+class_name)[i].clientHeight;
	      }
	      var max_height=Math.max(...height_arr);
	      max_height=max_height+5;
	      $("."+class_name).height(max_height);
	}
	//validate email
	function validateEmail(email)
	{
	        //var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	            var reg=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	        if (reg.test(email) == false) 
	        {
	           
	            return false;
	        }

	        return true;

	}
  function validateMobile(mobile)
  {
          //var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          var reg=/^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

          if (reg.test(mobile) == false) 
          {
             
              return false;
          }

          return true;

  }
  function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
      return true;
    }
}
	function SendInquiry(e,event)
	{
		event.preventDefault();
		var action=$(e).data('action');

		var formdata=$(e).serialize();
		$.ajax
	      ({
	            type:"POST",
	            url:action,
	            data:formdata,
	            success:function(response) {
	                  if(response!=0)
	                  {
	                  		$(e).trigger("reset");
	                        $('#inquiry_message_print').html('<div class="alert alert-success alert-block"><button data-dismiss="alert" class="close close-sm" type="button"><i class="fa fa-times"></i></button><strong> Done!</strong> Your Inquiry Details Sent Successfully.</div>'); 
	                  }
	                  else
	                  {
	                        $('#inquiry_message_print').html('<div class="alert alert-success alert-block"><button data-dismiss="alert" class="close close-sm" type="button"><i class="fa fa-times"></i></button><strong> Error!</strong>Error in Sending Inquiry Details</div>');              
	                  }
	            }
	      });      
	}
	//validate and priview uploaded file
function PreviewUpload(input,preview,validateEle="") 
{

      if (input.files && input.files[0]) 
      {

            var reader = new FileReader();
            is_valid_upload="1";


            if($(input).data('is_vaidate') && $(input).data('allowed')  && $(input).data('type'))
            {
                  //validate allowed type of content
                  var validate=$(input).data('is_vaidate');
                  var allowed=$(input).data('allowed');
                  var type=$(input).data('type');
                  
                  if(allowed!="")
                  {
                        var allowed_types=JSON.parse(atob(allowed));
                        if(allowed_types.length>0)
                        {
                              var upload_file_name=input.files[0].name;
                              var name_arr=upload_file_name.split('.')
                              var extension=name_arr[name_arr.length-1];
                              if($.inArray( extension, allowed_types )=="-1")
                              {
                                    is_valid_upload="0";
                                    $(input).next(".help").text("Invalid "+type+" Type");
                                    $(input).css("border","1px solid red");
                                    $(input).val("");
                              }
                        }
                  }
            }
            else
            {
                  type="image";
            }

            var file_type=input.files[0].type;
            //console.log(input.files[0]);
            reader.onload = function (e) 
            {
                  //preview valid image
                  if(type=="image")
                  {
                        if(is_valid_upload=="1")
                        {     
                              $(preview).attr('src', e.target.result);
                              $(input).next(".help").text(" ");
                              $(input).css("border","");
                              if($(validateEle).length)
                              {
                                    $(validateEle).val('1');      
                              }
                              
                        }else
                        {
                              $(preview).attr('src', 'img/noimage.png');
                              if($(validateEle).length)
                              {
                                    $(validateEle).val('0');      
                              }
                              
                              //$(input).next(".help").text("Invalid Image");
                        }
                  }
                  //preview valid video
                  else if(type=="video")  
                  {
                        if( is_valid_upload=="1")
                        {     
                              var fileUrl = window.URL.createObjectURL(input.files[0]);
                               var $source = $(preview).children();
                               $source[0].src =fileUrl;
                               $source[0].type =file_type;
                               $source.parent()[0].load();
                              
                              $(preview).show();
                              
                              $(input).next(".help").text(" ");
                              $(input).css("border","");

                              if($(validateEle).length)
                              {
                                    $(validateEle).val('1');      
                              }

                        }else
                        {
                              $(preview).hide();
                              var $source = $(preview).children();
                              $source[0].src ="";
                               $source[0].type ="";
                              //$(input).next(".help").text("Invalid Image");
                              if($(validateEle).length)
                              {
                                    $(validateEle).val('0');      
                              }

                        }
                  }
            }

            reader.readAsDataURL(input.files[0]);
      }
}

//automatic form validation for perticular form input elements
$(document).ready(function() {
      
      if($(".validate-form").length)
      {
            var validate_form_class_ele=$(".validate-form");
            var total_forms=validate_form_class_ele.length;
            var allowed_input_types=["text","email","number","phone","radio","password","date","datetime","datetime-local","file","hidden","password","checkbox","tel","time","url","textarea","select-multiple","select-one"];
            //var form_ele_arr=array();
            var all_form_ele_arr=[];
            for (var i = 0; i < total_forms; i++) 
            {
                  var current_form=validate_form_class_ele[i];
                  if($(current_form).attr("id") && $(current_form).attr("id")!="")
                  {
                        var current_form_id=$(current_form).attr("id"); 
                  }else
                  {
                        var current_form_id="form_"+i;
                        $(current_form).attr("id",current_form_id);
                  }
                  var err_msg_ele="error-msg";
                  if($(current_form).data("err_msg_ele") && $(current_form).data("err_msg_ele")!="" && $(current_form).data("err_msg_ele").length && $(current_form).data("err_msg_ele").length>0 && $(current_form).data("err_msg_ele")!=undefined)
                  {
                    err_msg_ele=$(current_form).data("err_msg_ele");
                  }
                   all_form_ele_arr[current_form_id]=[];     
                  var current_form_elements_raw_arr=$("#"+current_form_id+" :input");
                  var form_ele_arr=[];
                  
                  var form_ele_change_arr=[];
                  if(current_form_elements_raw_arr.length && current_form_elements_raw_arr.length>0)
                  {
                        for (var fre = 0; fre < current_form_elements_raw_arr.length; fre++)
                        {
                              //console.log($(current_form_elements_raw_arr[fre]));
                              var cur_ele_arr=[];
                              var onchange_ele_arr=[];
                              var current_input_type=current_form_elements_raw_arr[fre].type;   
                              if($(current_form_elements_raw_arr[fre]).data('is_validate') && $(current_form_elements_raw_arr[fre]).data('is_validate')=="1" && jQuery.inArray(current_input_type, allowed_input_types) !== -1)
                              {           
                                    var current_input_name=$(current_form_elements_raw_arr[fre]).attr("name");
                                    if(current_form_elements_raw_arr[fre].id && current_form_elements_raw_arr[fre].id!="")
                                    {
                                          var current_input_id=$(current_form_elements_raw_arr[fre]).attr("id");; 
                                    }else
                                    {
                                          var current_input_id=current_form_id+"_input_"+current_input_type+"_"+fre;
                                          $(current_form_elements_raw_arr[fre]).attr("id",current_input_id);
                                    }
                                    
                                    cur_ele_arr['id']=current_input_id;
                                    cur_ele_arr['type']=current_input_type;
                                    form_ele_arr.push(cur_ele_arr);
                                    (all_form_ele_arr[current_form_id]).push(cur_ele_arr);
                              }

                              if($(current_form_elements_raw_arr[fre]).data('is_check_change') && $(current_form_elements_raw_arr[fre]).data('is_check_change')=="1" && jQuery.inArray(current_input_type, allowed_input_types) !== -1)
                              {           
                                    var current_input_name=$(current_form_elements_raw_arr[fre]).attr("name");
                                    if(current_form_elements_raw_arr[fre].id && current_form_elements_raw_arr[fre].id!="")
                                    {
                                          var current_input_id=$(current_form_elements_raw_arr[fre]).attr("id");; 
                                    }else
                                    {
                                          var current_input_id=current_form_id+"_input_"+current_input_type+"_"+fre;
                                          $(current_form_elements_raw_arr[fre]).attr("id",current_input_id);
                                    }
                                    
                                    onchange_ele_arr['id']=current_input_id;
                                    onchange_ele_arr['type']=current_input_type;
                                    form_ele_change_arr.push(onchange_ele_arr);
                              }
                        }
                  }
                  
                  //check validation onchange
                  if(form_ele_change_arr.length>0)
                  {
                        for (var fic = 0; fic < form_ele_change_arr.length; fic++) 
                        {
                              var current_input_ele_id=form_ele_change_arr[fic]['id'];
                              var current_input_ele_type=form_ele_change_arr[fic]['type'];
                              
                              $("#"+current_input_ele_id).change(function(){
                                    if(current_input_ele_type=="text" || current_input_ele_type=="url" || current_input_ele_type=="phone" )
                                    {
                                          if($("#"+current_input_ele_id).val()=="")
                                          {
                                                error = 1;
                                                error_msg="This Field Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }
                                    }else if( current_input_ele_type=="tel")
                                    {
                                          if($("#"+current_input_ele_id).val()=="")
                                          {
                                                error = 1;
                                                error_msg="Mobile Number Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if(validateMobile($("#"+current_input_ele_id).val()))
                                                {
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                      }
                                                      $("#"+current_input_ele_id).css("border","");
                                                      
                                                }else
                                                {
                                                      error_msg="Please Enter Valid Mobile Number";
                                                      error = 1;
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                      }
                                                      $("#"+current_input_ele_id).css("border","1px solid red");
                                                }
                                                
                                          }
                                    }else if(current_input_ele_type=="password")
                                    {
                                          if($("#"+current_input_ele_id).val()=="")
                                          {
                                                error = 1;
                                                error_msg="Password Must Required.";
                                                //(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$  ---- forcheck valid password with alphanumeric check
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }
                                    }else if(current_input_ele_type=="number")
                                    {
                                          if($("#"+current_input_ele_id).attr("min") && $("#"+current_input_ele_id).attr("min")!="")
                                          {
                                                var current_min_val=$("#"+current_input_ele_id).attr("min");      
                                          }else
                                          {
                                                var current_min_val="0"
                                          }
                                          if($("#"+current_input_ele_id).attr("max") && $("#"+current_input_ele_id).attr("max")!="" && $("#"+current_input_ele_id).attr("max")>current_min_val)
                                          {
                                                var current_max_val=$("#"+current_input_ele_id).attr("max");
                                          }else
                                          {
                                                var current_max_val="0";
                                          }
                                                
                                          if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()<="0" || $("#"+current_input_ele_id).val()<current_min_val || $("#"+current_input_ele_id).val()>current_max_val)
                                          {
                                                error = 1;
                                                if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()<="0")
                                                {     
                                                      error_msg="This Field Must Required.";
            
                                                      if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                      {
                                                            error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                      }
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                      }
                                                }else if($("#"+current_input_ele_id).val()<current_min_val)
                                                {
                                                      error_msg="Enter Value greater than ".current_min_val;
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                      }
                                                }else if($("#"+current_input_ele_id).val()<current_min_val)
                                                {
                                                      error_msg="Enter Value smaller than ".current_max_val;
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                      }
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");


                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }
                                    }else if(current_input_ele_type=="date" || current_input_ele_type=="datetime" || current_input_ele_type=="datetime-local" || current_input_ele_type=="time")
                                    {
                                          if($("#"+current_input_ele_id).val()=="")
                                          {
                                                error = 1;
                                                error_msg="This Field Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }
                                    }else if(current_input_ele_type=="textarea")
                                    {
                                          if($.trim($("#"+current_input_ele_id).val())=="")
                                          {
                                                error = 1;
                                                error_msg="This Field Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }     
                                    }else if(current_input_ele_type=="select-multiple" || current_input_ele_type=="select-one")
                                    {
                                          if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()=="0")
                                          {
                                                error = 1;
                                                error_msg="This Field Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }     
                                    }else if(current_input_ele_type=="hidden")
                                    {
                                      var is_valid_hidden_field="0";//focus-ele
                                var hidden_focus_field=$("#"+current_input_ele_id);
                                if($("#"+current_input_ele_id).data('focus-ele') && $("#"+current_input_ele_id).data('focus-ele')!="")
                                {
                                  var data_focus_hidden_field_ele=$("#"+current_input_ele_id).data('focus-ele');
                                  hidden_focus_field=$("#"+data_focus_hidden_field_ele)
                                }
                                if($("#"+current_input_ele_id).data('is_numeric') && $("#"+current_input_ele_id).data('is_numeric')=="1")
                                {
                                  if($("#"+current_input_ele_id).val()!="" && $("#"+current_input_ele_id).val()>"0")
                                  {
                                    is_valid_hidden_field="1";
                                  }
                                }else
                                {
                                  if($("#"+current_input_ele_id).val()!="")
                                  {
                                    is_valid_hidden_field="1";
                                  }
                                }
                                //console.log(hidden_focus_field);
                                    //if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()=="0")
                                    if(is_valid_hidden_field=="0")
                                    {
                                          error = 1;
                                          error_msg="This Field Must Required.";
                                          if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                          {
                                                error_msg=$("#"+current_input_ele_id).data('error_msg');
                                          }
                                          if(hidden_focus_field.nextAll("."+err_msg_ele) && hidden_focus_field.nextAll("."+err_msg_ele).length=="1")
                                          {
                                                hidden_focus_field.nextAll("."+err_msg_ele).html(error_msg);
                                                //console.log(hidden_focus_field.nextAll("."+err_msg_ele));
                                          }else
                                          {
                                                hidden_focus_field.prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          hidden_focus_field.css("border","1px solid red");
                                          //console.log(hidden_focus_field);
                                    }else
                                    {
                                          if(hidden_focus_field.nextAll("."+err_msg_ele) && hidden_focus_field.nextAll("."+err_msg_ele).length=="1")
                                          {
                                                hidden_focus_field.nextAll("."+err_msg_ele).html('');
                                          }else
                                          {
                                                hidden_focus_field.prev().nextAll("."+err_msg_ele).html('');
                                          }
                                          hidden_focus_field.css("border","");
                                    }     
                                    }else if(current_input_ele_type=="email")
                                    {
                                          if($("#"+current_input_ele_id).val()=="")
                                          {
                                                error = 1;
                                                error_msg="Email Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if(validateEmail($("#"+current_input_ele_id).val()))
                                                {
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                      }
                                                      $("#"+current_input_ele_id).css("border","");
                                                      
                                                }else
                                                {
                                                      error_msg="Please Enter Valid Email";
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                      }
                                                      $("#"+current_input_ele_id).css("border","1px solid red");
                                                }
                                                
                                          }
                                    }else if(current_input_ele_type=="file")
                                    {
                                        var other_check_field_val="";
                                        if($("#"+current_input_ele_id).data("old_field") && $("#"+current_input_ele_id).data("old_field")!=undefined )
                                        {
                                          var other_check_field=$("#"+current_input_ele_id).data("old_field");
                                          if($("#"+other_check_field).length)
                                          {
                                            other_check_field_val=$("#"+other_check_field).val();
                                          }
                                        }
                                         if ($("#"+current_input_ele_id).val()=="" && $("#"+current_input_ele_id).files && $("#"+current_input_ele_id).files[0] && other_check_field_val=="") 
                                         {
                                                error_msg="Please Upload Valid File.";
                                                

                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                         }else
                                         {
                                                var input=$("#"+current_input_ele_id);
                                                if($(input).data('allowed') && $(input).data('allowed')!="")
                                                {
                                                      //validate allowed type of content
                                                      var allowed=$(input).data('allowed');
                                                      
                                                      var allowed_types=JSON.parse(atob(allowed));
                                                      if(allowed_types.length>0)
                                                      {
                                                            var upload_file_name=input.files[0].name;
                                                            var name_arr=upload_file_name.split('.')
                                                            var extension=name_arr[name_arr.length-1];
                                                            if($.inArray( extension, allowed_types )=="-1")
                                                            {
                                                                  error_msg="Uploaded file type isn't valid.";
                                                                  if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                                  {
                                                                        $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                                  }else
                                                                  {
                                                                        $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                                  }
                                                                  $("#"+current_input_ele_id).css("border","1px solid red");
                                                                  $(input).val("");
                                                            }
                                                      }
                                                      
                                                }else
                                                {
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html("");
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html("");
                                                      }
                                                      $("#"+current_input_ele_id).css("border","");      
                                                }
                                                
                                         }                                    
                                    }else if(current_input_ele_type=="checkbox")
                                    {
                                          if($("#"+current_input_ele_id).prop('checked') != true)
                                          {
                                                error_msg="Please check this checkbox";
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html("");
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html("");
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }                             
                                    }else if(current_input_ele_type=="radio")
                                    {
                                          var current_input_name=$("#"+current_input_ele_id).attr('name');
                                          if($("[name="+current_input_ele_id+"]").prop('checked') != true)
                                          {
                                                error_msg="please check one of above radios";
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html("");
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html("");
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                          }
                                    }
                              });
                        }
                  }
                  

                  //check validation on form submission
                  /*$("#"+current_form_id).submit(function(){
                        
                        if(form_ele_arr.length>0)
                        {
                              
                        }
                        
                        
                  });*/

            }
            //console.log(all_form_ele_arr);      
            $("form").submit(function(){
                  var error = 0;
                  var current_submit_form_id=$(this).attr("id");
                  //console.log(current_submit_form_id);
                  if(all_form_ele_arr[current_submit_form_id]&& all_form_ele_arr[current_submit_form_id].length  && all_form_ele_arr[current_submit_form_id].length>0)
                  {
                        //console.log(all_form_ele_arr[current_submit_form_id]); 
                        for (var fi = 0; fi < all_form_ele_arr[current_submit_form_id].length; fi++) 
                        {
                              var current_input_ele_id=all_form_ele_arr[current_submit_form_id][fi]['id'];
                              var current_input_ele_type=all_form_ele_arr[current_submit_form_id][fi]['type'];

                              if(current_input_ele_type=="text" || current_input_ele_type=="url" || current_input_ele_type=="phone" )
                                    {
                                          if($("#"+current_input_ele_id).val()=="")
                                          {
                                                error = 1;
                                                error_msg="This Field Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                            
                                            if($("#"+current_input_ele_id).data('validate-other') && $("#"+current_input_ele_id).data('validate-other')!="")
                                            {
                                              //console.log($("#"+current_input_ele_id).data('validate-other'));
                                            }else
                                            {
                                              if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                            }   
                                          }
                                    }else if( current_input_ele_type=="tel")
                                    {
                                          if($("#"+current_input_ele_id).val()=="")
                                          {
                                                error = 1;
                                                error_msg="Mobile Number Must Required.";
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }else
                                          {
                                                if(validateMobile($("#"+current_input_ele_id).val()))
                                                {
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                      }
                                                      $("#"+current_input_ele_id).css("border","");
                                                      
                                                }else
                                                {
                                                      error_msg="Please Enter Valid Mobile Number";
                                                      error = 1;
                                                      if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                      {
                                                            $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                      }else
                                                      {
                                                            $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                      }
                                                      $("#"+current_input_ele_id).css("border","1px solid red");
                                                }
                                                
                                          }
                                    }else if(current_input_ele_type=="password")
                              {
                                    if($("#"+current_input_ele_id).val()=="")
                                    {
                                          error = 1;
                                          error_msg="Password Must Required.";
                                          //(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$  ---- forcheck valid password with alphanumeric check
                                          if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                          {
                                                error_msg=$("#"+current_input_ele_id).data('error_msg');
                                          }
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                    }else
                                    {
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                          }
                                          $("#"+current_input_ele_id).css("border","");
                                    }
                              }else if(current_input_ele_type=="number")
                              {
                                    if($("#"+current_input_ele_id).attr("min") && $("#"+current_input_ele_id).attr("min")!="")
                                    {
                                          var current_min_val=parseFloat($("#"+current_input_ele_id).attr("min"));      
                                    }else
                                    {
                                          var current_min_val=0;
                                    }
                                    if($("#"+current_input_ele_id).attr("max") && $("#"+current_input_ele_id).attr("max")!="" && $("#"+current_input_ele_id).attr("max")>current_min_val)
                                    {
                                          var current_max_val=parseFloat($("#"+current_input_ele_id).attr("max"));
                                    }else
                                    {
                                          var current_max_val=100000000;
                                    }
                                          
                                    if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()<=0 || $("#"+current_input_ele_id).val()<current_min_val || $("#"+current_input_ele_id).val()>current_max_val)
                                    {
                                          error = 1;
                                          console.log($("#"+current_input_ele_id).val());
                                          if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()<=0)
                                          {     
                                                error_msg="This Field Must Required.";
      
                                                if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                                {
                                                      error_msg=$("#"+current_input_ele_id).data('error_msg');
                                                }
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                          }else if($("#"+current_input_ele_id).val()<current_min_val)
                                          {
                                                error_msg="Enter Value greater than ".current_min_val;
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                          }else if($("#"+current_input_ele_id).val()>current_max_val)
                                          {
                                                error_msg="Enter Value smaller than ".current_max_val;
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                          }
                                          //$("#"+current_input_ele_id).css("border","1px solid red");


                                    }else
                                    {
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                          }
                                          $("#"+current_input_ele_id).css("border","");
                                    }
                              }else if(current_input_ele_type=="date" || current_input_ele_type=="datetime" || current_input_ele_type=="datetime-local" || current_input_ele_type=="time")
                              {
                                    if($("#"+current_input_ele_id).val()=="")
                                    {
                                          error = 1;
                                          error_msg="This Field Must Required.";
                                          if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                          {
                                                error_msg=$("#"+current_input_ele_id).data('error_msg');
                                          }
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                    }else
                                    {
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                          }
                                          $("#"+current_input_ele_id).css("border","");
                                    }
                              }else if(current_input_ele_type=="textarea")
                              {
                                    if($.trim($("#"+current_input_ele_id).val())=="")
                                    {
                                          error = 1;
                                          error_msg="This Field Must Required.";
                                          if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                          {
                                                error_msg=$("#"+current_input_ele_id).data('error_msg');
                                          }
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                    }else
                                    {
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                          }
                                          $("#"+current_input_ele_id).css("border","");
                                    }     
                              }else if(current_input_ele_type=="select-multiple" || current_input_ele_type=="select-one"  )
                              {
                                    if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()=="0")
                                    {
                                          error = 1;
                                          error_msg="This Field Must Required.";
                                          if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                          {
                                                error_msg=$("#"+current_input_ele_id).data('error_msg');
                                          }
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                    }else
                                    {
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                          }
                                          $("#"+current_input_ele_id).css("border","");
                                    }     
                              }
                              else if(current_input_ele_type=="hidden")
                              {
                                var is_valid_hidden_field="0";//focus-ele
                                var hidden_focus_field=$("#"+current_input_ele_id);
                                if($("#"+current_input_ele_id).data('focus-ele') && $("#"+current_input_ele_id).data('focus-ele')!="")
                                {
                                  var data_focus_hidden_field_ele=$("#"+current_input_ele_id).data('focus-ele');
                                  hidden_focus_field=$("#"+data_focus_hidden_field_ele)
                                }
                                if($("#"+current_input_ele_id).data('is_numeric') && $("#"+current_input_ele_id).data('is_numeric')=="1")
                                {
                                  if($("#"+current_input_ele_id).val()!="" && $("#"+current_input_ele_id).val()>"0")
                                  {
                                    is_valid_hidden_field="1";
                                  }
                                }else
                                {
                                  if($("#"+current_input_ele_id).val()!="")
                                  {
                                    is_valid_hidden_field="1";
                                  }
                                }
                                //console.log(hidden_focus_field);
                                    //if($("#"+current_input_ele_id).val()=="" || $("#"+current_input_ele_id).val()=="0")
                                    if(is_valid_hidden_field=="0")
                                    {
                                          error = 1;
                                          error_msg="This Field Must Required.";
                                          if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                          {
                                                error_msg=$("#"+current_input_ele_id).data('error_msg');
                                          }
                                          if(hidden_focus_field.nextAll("."+err_msg_ele) && hidden_focus_field.nextAll("."+err_msg_ele).length=="1")
                                          {
                                                hidden_focus_field.nextAll("."+err_msg_ele).html(error_msg);
                                                //console.log(hidden_focus_field.nextAll("."+err_msg_ele));
                                          }else
                                          {
                                                hidden_focus_field.prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          hidden_focus_field.css("border","1px solid red");
                                          //console.log(hidden_focus_field);
                                    }else
                                    {
                                          if(hidden_focus_field.nextAll("."+err_msg_ele) && hidden_focus_field.nextAll("."+err_msg_ele).length=="1")
                                          {
                                                hidden_focus_field.nextAll("."+err_msg_ele).html('');
                                          }else
                                          {
                                                hidden_focus_field.prev().nextAll("."+err_msg_ele).html('');
                                          }
                                          hidden_focus_field.css("border","");
                                    }     
                              }
                              else if(current_input_ele_type=="email")
                              {
                                    if($("#"+current_input_ele_id).val()=="")
                                    {
                                          error = 1;
                                          error_msg="Email Must Required.";
                                          if($("#"+current_input_ele_id).data('error_msg') && $("#"+current_input_ele_id).data('error_msg')!="")
                                          {
                                                error_msg=$("#"+current_input_ele_id).data('error_msg');
                                          }
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                    }else
                                    {
                                          if(validateEmail($("#"+current_input_ele_id).val()))
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html('');
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html('');
                                                }
                                                $("#"+current_input_ele_id).css("border","");
                                                
                                          }else
                                          {
                                                error_msg="Please Enter Valid Email";
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                }
                                                $("#"+current_input_ele_id).css("border","1px solid red");
                                          }
                                          
                                    }
                              }else if(current_input_ele_type=="file")
                              {
                                  var other_check_field_val="";
                                  if($("#"+current_input_ele_id).data("old_field") && $("#"+current_input_ele_id).data("old_field")!=undefined )
                                  {
                                    var other_check_field=$("#"+current_input_ele_id).data("old_field");
                                    if($("#"+other_check_field).length)
                                    {
                                      other_check_field_val=$("#"+other_check_field).val();
                                    }
                                  }

                                  if ($("#"+current_input_ele_id).val()=="" &&  other_check_field_val=="") 
                                   {
                                          error = 1;
                                          error_msg="Please Upload Valid File.";
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                   }else
                                   {
                                          var input=$("#"+current_input_ele_id);
                                          if($(input).data('allowed') && $(input).data('allowed')!="")
                                          {
                                                //validate allowed type of content
                                                var allowed=$(input).data('allowed');
                                                
                                                var allowed_types=JSON.parse(atob(allowed));
                                                if(allowed_types.length>0)
                                                {
                                                      var upload_file_name=input.files[0].name;
                                                      var name_arr=upload_file_name.split('.')
                                                      var extension=name_arr[name_arr.length-1];
                                                      if($.inArray( extension, allowed_types )=="-1")
                                                      {
                                                            error = 1;
                                                            error_msg="Uploaded file type isn't valid.";
                                                            if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                            {
                                                                  $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                                            }else
                                                            {
                                                                  $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                                            }
                                                            $("#"+current_input_ele_id).css("border","1px solid red");
                                                            $(input).val("");
                                                      }
                                                }
                                                
                                          }else
                                          {
                                                if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                                {
                                                      $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html("");
                                                }else
                                                {
                                                      $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html("");
                                                }
                                                $("#"+current_input_ele_id).css("border","");      
                                          }
                                          
                                   }                                    
                              }else if(current_input_ele_type=="checkbox")
                              {
                                    if($("#"+current_input_ele_id).prop('checked') != true)
                                    {
                                          error = 1;
                                          error_msg="Please check this checkbox";
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                    }else
                                    {
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html("");
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html("");
                                          }
                                          $("#"+current_input_ele_id).css("border","");
                                    }                             
                              }else if(current_input_ele_type=="radio")
                              {
                                    var current_input_name=$("#"+current_input_ele_id).attr('name');
                                    if($("[name="+current_input_ele_id+"]").prop('checked') != true)
                                    {
                                          error = 1;
                                          error_msg="please check one of above radios";
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html(error_msg);
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html(error_msg);
                                          }
                                          $("#"+current_input_ele_id).css("border","1px solid red");
                                    }else
                                    {
                                          if($("#"+current_input_ele_id).nextAll("."+err_msg_ele) && $("#"+current_input_ele_id).nextAll("."+err_msg_ele).length=="1")
                                          {
                                                $("#"+current_input_ele_id).nextAll("."+err_msg_ele).html("");
                                          }else
                                          {
                                                $("#"+current_input_ele_id).prev().nextAll("."+err_msg_ele).html("");
                                          }
                                          $("#"+current_input_ele_id).css("border","");
                                    }
                              }
                        }     
                  }
                  //console.log(error);
                  if(error == 1)return false; else return true;
            });
      
      }else
      {
            var validate_form_class_ele="";
      }


});

function ReSetInquirySearch()
{
  var url="process/ajax_action_php_function.php";
  var method="post";
  var action="ReSetInquirySearch";

  $.ajax({
          type: method,
          url: url,
          data: {action:action},
          success: function (data) {
            location.reload();
          }
    }); 
}

function RemoveInqAttachment(id_img,suid) 
  {
      swal({
            title: 'Are you sure to delete this file?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a5dc86',
            cancelButtonColor: '#d57171',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
          $.ajax({
              url: 'process/ajax_action_php_function.php',
              type: 'POST',
              data: {
                  id_img: id_img,
                  suid: suid,
                  action:'RemoveInquiryAttachments'
              },
              error: function() {
                  swal(
                        {
                          title: 'Error',
                          text: 'Error in file removal process.',
                          type: 'error',
                          confirmButtonColor: '#4fa7f3'
                        }  ); 
              },
              success: function(data) {
                  if (data = 'done') {
                      $('.proli_' + id_img).hide();
                      swal(
                        {
                          title: 'Success',
                          text: 'File removed successfully.',
                          type: 'success',
                          confirmButtonColor: '#4fa7f3'
                        }  ); 
                  } else {
                      swal(
                        {
                          title: 'Error',
                          text: 'Error in file removal process.',
                          type: 'error',
                          confirmButtonColor: '#4fa7f3'
                        }  ); 
                  }
              }
          });
      });
  }

  $(document).ready(function(){
    $('input[type=tel]').keypress(validateNumber);
});
  
  function AddLeadContact()
  {
     var total_contact=$("#total_contacts").val();
      var url="process/ajax_action_php_function.php";
      var method="post";
      var action="AddLeadContact";
      //console.log(total_contact);
      total_contact=parseInt(total_contact);
      var form_data={};
            form_data['total']=total_contact;
            form_data['action']=action;
            
            //console.log(form_data)
            $.ajax({
                type: method,
                url: url,
                data: form_data,
                success: function (data) {
                  if(data!="")
                  {
                    //console.log(data);
                    $("#addtional_contact_wrapper").append(data);
                    $("#total_contacts").val(total_contact+1);
                    //$("#cname"+total_contact+1)
                    $(".cname_auto_suggest").keyup(function(){
                      var cli=$(this).data('cli');
                      //console.log(cli);
                      //console.log($(this).nextAll(".suggesstion-box"));
                      var keyword=$(this).val();
                      var cur_ele_id=$(this).attr("id");
                      var suggesstion_box=$(this).nextAll(".suggesstion-box");
                      GetAutoSuggestData(keyword,cur_ele_id,suggesstion_box,cli)    
                    });
                    $(".cname_auto_suggest").blur(function(){
                      //console.log($(this).nextAll(".suggesstion-box"));
                      var keyword=$(this).val();
                      var cur_ele_id=$(this).attr("id");
                      var suggesstion_box=$(this).nextAll(".suggesstion-box");
                      //$(suggesstion_box).hide();
                      //console.log($( document.activeElement));
                      $('body').click(function(evnt) {
                        console.log();
                        if(evnt.target.id=="")
                        {
                          $(".suggesstion-box").hide();
                        }
                      });
                    });
                    $(".cname_auto_suggest").focus(function(){
                      //console.log($(this).nextAll(".suggesstion-box"));
                      var keyword=$(this).val();
                      var cur_ele_id=$(this).attr("id");
                      var suggesstion_box=$(this).nextAll(".suggesstion-box");
                      if(keyword!="")
                      {
                        $(suggesstion_box).show();
                      }
                    });
                  }
                }
          });         
  }
  function RemoveLeadContact(e)
  {
    var val=$(e).data('val');
    //console.log(val);
    //$("#cname"+val).parent().remove();
    //$("#contact_mobile"+val).parent().remove();
    //$("#contact_category"+val).parent().remove();
    $(".lblLeadContact"+val).parent().remove();
    //$(e).remove();
  }

  function RemoveLeadContactDB(e)
  {
    var form_data={};
    var url="process/ajax_action_php_function.php";
      var method="post";
            form_data['cid']=$(e).data('idc');
            form_data['action']="RemoveAddedInquiryContact";
            
            //console.log(form_data)
            swal({
            title: 'Are you sure to delete this contact?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a5dc86',
            cancelButtonColor: '#d57171',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            $.ajax({
                type: method,
                url: url,
                data: form_data,
                success: function (data) {
                  if(data!="")
                  {
                    RemoveLeadContact($(e));

                    /*var val=$(e).data('val');
                    $(".lblLeadContact"+val).parent().remove();*/
                  }
                }
          }); 
      });
  }
  function RemoveLeadRemarksDB(e)
  {
    var form_data={};
    var url="process/ajax_action_php_function.php";
      var method="post";
            form_data['id_remarks']=$(e).data('idc');
            form_data['action']="RemoveAddedInquiryRemarks";
            
            //console.log(form_data)
            swal({
            title: 'Are you sure to delete this remark?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#a5dc86',
            cancelButtonColor: '#d57171',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
          $.ajax({
                type: method,
                url: url,
                data: form_data,
                success: function (data) {
                  if(data!="")
                  {
                    RemoveLeadRemarks($(e));
                   
                  }
                }
          }); 
      });
            
  }
  function AddLeadRemarks()
  {
    var total_remarks=$("#total_remarks").val();
    total_remarks=parseInt(total_remarks);
    var add_content='<input type="hidden" id="id_remarks'+(total_remarks+1)+'" name="id_remarks[]" value="0"><div class="col-sm-9" id="remark_container_1_'+(total_remarks+1)+'"><label for="firstname" class="control-label">Remark '+(total_remarks+1)+'</label><div class="form-group"><textarea name="remarks[]" data-is_validate="0"  id="remarks'+(total_remarks+1)+'" class="form-control" placeholder="Remarks" value=""></textarea><span class="help" id="msg1"></span></div></div><div class="col-sm-3 text-center" id="remark_container_2_'+(total_remarks+1)+'"><label for="firstname" class="control-label">&nbsp;</label><div class="form-group"><button type="button" onclick="return RemoveLeadRemarks(this);" data-val="'+(total_remarks+1)+'" class="btn btn-danger"><i class="fa fa-trash-alt"></i></button></div></div>';
    $("#addtional_remarks_wrapper").append(add_content);
    $("#total_remarks").val((total_remarks+1));
  }
  function RemoveLeadRemarks(e)
  {
    var val=$(e).data('val');
    $("#id_remarks"+val).remove();
    $("#remark_container_1_"+val).remove();
    $("#remark_container_2_"+val).remove();
  }

  $(".view_large_img").click(function(){
    var img_source=$(this).attr('src');
    
    var width = $("#modal_zoom_image .modal-body").width();
    var height = $("#modal_zoom_image .modal-body").height();
    /*console.log(height);
    console.log(width);*/
    var new_img='<button type="button" class="close" style="position: absolute;right: 10px;top: 2px;" data-dismiss="modal" aria-hidden="true">&times;</button><div class="img-responsive"> <img src="'+img_source+'" style="max-width:100%;border-radius:5px;" /></div>';
    $("#modal_zoom_image .modal-body").html(new_img);
    
    $("#modal_zoom_image").modal('show');
  });

  function ReadMoreList(e)
  {
     $('.cust-read-more-li').slideToggle('slow');
  }

  function SIPCalc(sip_amount,sip_period,sip_expected_returns)
  {
    var annualRate=sip_expected_returns;
    var years=sip_period;
    var investment=sip_amount;

    var monthlyRate = annualRate / 12 / 100;
    var months = years * 12;
    var futureValue = 0;

    var total = ((investment*years*annualRate));

      percentage=(1 * (1+monthlyRate) * (((Math.pow((1+monthlyRate),months)) - 1)/monthlyRate));
      percentage=percentage.toFixed(2);
      //percentage=percentage-0.06;
      return futureValue=investment*percentage;
      //console.log(futureValue);
  }
  function SIPDelayCalc(sip_amount,sip_period,sip_expected_returns)
  {
    var annualRate=sip_expected_returns;
    var years=sip_period;
    var investment=sip_amount;

    var monthlyRate = annualRate / 12 / 100;
    var months = sip_period;
    var futureValue = 0;

    var total = ((investment*years*annualRate));

      percentage=(1 * (1+monthlyRate) * ((Math.pow((1+monthlyRate),months)) - 1)/monthlyRate);
      percentage=percentage.toFixed(2);
      percentage=percentage-0.06;
      return futureValue=investment*percentage;
      //console.log(futureValue);
  }
  function SIPPlannerCalc(sip_target_amount,sip_period,sip_expected_returns)
  {
    var annualRate=sip_expected_returns;
    var years=sip_period;
    var investment=sip_target_amount;

    var monthlyRate = annualRate / 12 / 100;
    var months = years * 12;
    var futureValue = 0;

    //var total = ((investment*years*annualRate));

      percentage=(1 * (1+monthlyRate) * ((Math.pow((1+monthlyRate),months)) - 1)/monthlyRate);
      percentage=percentage.toFixed(2);
      //percentage=percentage-0.06;
      return futureValue=investment/percentage;
      //console.log(futureValue);
  }
  function CalculateSIP()
  {
    var sip_amount=$("#mi_amount_sip").val();
    var sip_period=$("#mi_period_sip").val();
    var sip_expected_returns=$("#mi_returns_sip").val();

     var is_valid_cal=1; 
     if(sip_expected_returns<1 || sip_expected_returns>100)
    {
      is_valid_cal=0;

      $("#mi_returns_sip").css("border","1px solid red");
      $("#mi_returns_sip").focus();
      $("#mi_returns_sip").next(".help").html("Enter Return value between 1 & 100 ");
    }else
    {
        $("#mi_returns_sip").css("border","");
        $("#mi_returns_sip").next(".help").html("");
    }
    if(sip_period<1 || sip_period>30)
    {
      is_valid_cal=0;

      $("#mi_period_sip").css("border","1px solid red");
      $("#mi_period_sip").focus();
      $("#mi_period_sip").next(".help").html("Enter Period between 1 & 30 ");
    }else
    {
        $("#mi_period_sip").css("border","");
        $("#mi_period_sip").next(".help").html("");
    }

    

    if(sip_amount<500 || sip_amount>1000000)
    {
      is_valid_cal=0;

      $("#mi_amount_sip").css("border","1px solid red");
      $("#mi_amount_sip").focus();
      $("#mi_amount_sip").next(".help").html("Enter amount between 500 & 10,00,000 ");
    }else
    {
        $("#mi_amount_sip").css("border","");
        $("#mi_amount_sip").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
          var sip_total_invest=sip_amount*sip_period*12;
          var sip_total_return=SIPCalc(sip_amount,sip_period,sip_expected_returns); 
          var sip_total_earning=sip_total_return-sip_total_invest;

          sip_total_invest=sip_total_invest.toFixed(2);
          sip_total_return=sip_total_return.toFixed(2);
          sip_total_earning=sip_total_earning.toFixed(2);

          $("#td-total-sip-invest").html(sip_total_invest);
          $("#td-total-sip-earning").html(sip_total_earning);
          $("#td-total-sip-return").html(sip_total_return);

          //console.log(sip_earning);
          var Period_arr=["5","10","15","20","25","30"];
          var Percentage_arr=["10","12","15","20"]; 

          for (var pi = 0; pi < Percentage_arr.length; pi++) 
          {
            for (var pic = 0; pic < Period_arr.length; pic++) 
            {
              var cur_ele_id="td-"+Percentage_arr[pi]+"-"+Period_arr[pic];
              var cur_val=SIPCalc(sip_amount,parseFloat(Period_arr[pic]),parseFloat(Percentage_arr[pi]));
              cur_val=cur_val.toFixed(2);
              $("#"+cur_ele_id).html(cur_val);
            } 
          }
          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateSIP()
  {
    $("#mi_amount_sip").val("");
    $("#mi_period_sip").val("");
    $("#mi_returns_sip").val("");

    $("#SectionCalculationOutput").hide(); 
  }
  function FormatIndianCurrancy(nStr)
  {
      var nStr=parseFloat(nStr).toFixed(2);
      nStr += '';
      x = nStr.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return 'Rs. '+x1 + x2;
  }
  function CalculateSIPDelay()
  {
    var sip_amount=$("#mi_amount_sip_delay").val();
    var sip_period=$("#mi_period_sip_delay").val();
    var sip_expected_returns=$("#mi_returns_sip_delay").val();
    var sip_delay_months=$("#mi_delay_sip_delay").val();
    var sip_total_months=sip_period*12;
     var is_valid_cal=1; 
     if(sip_expected_returns<1 || sip_expected_returns>100)
    {
      is_valid_cal=0;

      $("#mi_returns_sip_delay").css("border","1px solid red");
      $("#mi_returns_sip_delay").focus();
      $("#mi_returns_sip_delay").next(".help").html("Enter Return value between 1 & 100 ");
    }else
    {
        $("#mi_returns_sip_delay").css("border","");
        $("#mi_returns_sip_delay").next(".help").html("");
    }
    if(sip_period<1 || sip_period>30)
    {
      is_valid_cal=0;

      $("#mi_period_sip_delay").css("border","1px solid red");
      $("#mi_period_sip_delay").focus();
      $("#mi_period_sip_delay").next(".help").html("Enter Period between 1 & 30 ");
    }else
    {
        $("#mi_period_sip_delay").css("border","");
        $("#mi_period_sip_delay").next(".help").html("");
    }
    if(sip_delay_months<1 || sip_delay_months>sip_total_months)
    {
      is_valid_cal=0;

      $("#mi_delay_sip_delay").css("border","1px solid red");
      $("#mi_delay_sip_delay").focus();
      $("#mi_delay_sip_delay").next(".help").html("Enter Delay Month between 1 & "+sip_total_months);
    }else
    {
        $("#mi_delay_sip_delay").css("border","");
        $("#mi_delay_sip_delay").next(".help").html("");
    }

    

    if(sip_amount<500 || sip_amount>1000000)
    {
      is_valid_cal=0;

      $("#mi_amount_sip_delay").css("border","1px solid red");
      $("#mi_amount_sip_delay").focus();
      $("#mi_amount_sip_delay").next(".help").html("Enter amount between 500 & 10,00,000 ");
    }else
    {
        $("#mi_amount_sip_delay").css("border","");
        $("#mi_amount_sip_delay").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
      //console.log(sip_delay_months);
          var sip_total_invest=sip_amount*sip_period*12;
          var sip_total_return=SIPCalc(sip_amount,sip_period,sip_expected_returns); 
          var sip_total_return_dealyed_months=SIPDelayCalc(sip_amount,sip_delay_months,sip_expected_returns); 
          var amount_lost=sip_total_return-sip_total_return_dealyed_months;
          
          var sip_total_earning=sip_total_return-sip_total_invest;

          sip_total_invest=sip_total_invest.toFixed(2);
          sip_total_return=sip_total_return.toFixed(2);
          sip_total_earning=sip_total_earning.toFixed(2);
          sip_total_return_dealyed_months=sip_total_return_dealyed_months.toFixed(2);
          amount_lost=amount_lost.toFixed(2);

          

          /*console.log(sip_total_return);
          console.log(sip_total_return_dealyed_months);
          console.log(amount_lost);*/
          //FormatIndianCurrancy
          $("#td-total-sip-invest").html(FormatIndianCurrancy(sip_total_return));
          $("#td-total-sip-earning").html(FormatIndianCurrancy(amount_lost));
          $("#td-total_delay-months").html(sip_delay_months+" Months");
          $("#td-total_amount-loose").html(FormatIndianCurrancy(sip_total_return_dealyed_months));
          

          //console.log(sip_earning);
          /*var Period_arr=["5","10","15","20","25","30"];
          var Percentage_arr=["10","12","15","20"]; 

          for (var pi = 0; pi < Percentage_arr.length; pi++) 
          {
            for (var pic = 0; pic < Period_arr.length; pic++) 
            {
              var cur_ele_id="td-"+Percentage_arr[pi]+"-"+Period_arr[pic];
              var cur_val=SIPCalc(sip_amount,parseFloat(Period_arr[pic]),parseFloat(Percentage_arr[pi]));
              cur_val=cur_val.toFixed(2);
              $("#"+cur_ele_id).html(cur_val);
            } 
          }*/
          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateSIPDelay()
  {
    $("#mi_amount_sip_delay").val("");
    $("#mi_period_sip_delay").val("");
    $("#mi_returns_sip_delay").val("");
    $("#mi_delay_sip_delay").val("");


    $("#SectionCalculationOutput").hide(); 
  }
  function CalculateSIPNeed()
  {
    var sip_amount=$("#mi_amount_sip_need").val();
    var sip_period=$("#mi_period_sip_need").val();
    var sip_expected_returns=$("#mi_returns_sip_need").val();

     var is_valid_cal=1; 
     if(sip_expected_returns<1 || sip_expected_returns>100)
    {
      is_valid_cal=0;

      $("#mi_returns_sip_need").css("border","1px solid red");
      $("#mi_returns_sip_need").focus();
      $("#mi_returns_sip_need").next(".help").html("Enter Return value between 1 & 100 ");
    }else
    {
        $("#mi_returns_sip_need").css("border","");
        $("#mi_returns_sip_need").next(".help").html("");
    }
    if(sip_period<1 || sip_period>30)
    {
      is_valid_cal=0;

      $("#mi_period_sip_need").css("border","1px solid red");
      $("#mi_period_sip_need").focus();
      $("#mi_period_sip_need").next(".help").html("Enter Period between 1 & 30 ");
    }else
    {
        $("#mi_period_sip_need").css("border","");
        $("#mi_period_sip_need").next(".help").html("");
    }

    

    if(sip_amount<5000 || sip_amount>100000000)
    {
      is_valid_cal=0;

      $("#mi_amount_sip_need").css("border","1px solid red");
      $("#mi_amount_sip_need").focus();
      $("#mi_amount_sip_need").next(".help").html("Enter amount between 5000 & 10,00,00,000 ");
    }else
    {
        $("#mi_amount_sip_need").css("border","");
        $("#mi_amount_sip_need").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
          
          var sip_total_return=SIPPlannerCalc(sip_amount,sip_period,sip_expected_returns); 
          var sip_total_months=sip_period*12;
          var sip_total_invest=sip_total_return*sip_total_months;
          //var sip_total_earning=sip_total_return-sip_total_invest;
          console.log(sip_total_return)
          sip_total_invest=sip_total_invest.toFixed(2);
          sip_total_return=sip_total_return.toFixed(2);
          //sip_total_earning=sip_total_earning.toFixed(2);
          $("#td-monthly-sip-invest").html(FormatIndianCurrancy(sip_total_return));
          $("#td-sip-plan-target-amount1").html(FormatIndianCurrancy(sip_amount));
          $("#td-sip-plan-target-amount2").html(FormatIndianCurrancy(sip_amount));
          $("#td-sip-plan-time").html(sip_period+" Years");
          $("#td-total-sip-invest").html(FormatIndianCurrancy(sip_total_invest));
          $("#td-total-sip-installment").html(sip_total_months);
          

          //console.log(sip_earning);
          var Period_arr=["1","5","10","15","20","25","30"];
          var Percentage_arr=["8","10","12","15","20"]; 

          for (var pi = 0; pi < Period_arr.length; pi++) 
          {
            for (var pic = 0; pic < Percentage_arr.length; pic++) 
            {
              var cur_ele_id="td-"+Period_arr[pi]+"-"+Percentage_arr[pic];
              var cur_val=SIPPlannerCalc(sip_amount,parseFloat(Period_arr[pi]),parseFloat(Percentage_arr[pic]));
              cur_val=cur_val.toFixed(2);
              $("#"+cur_ele_id).html(FormatIndianCurrancy(cur_val));
            } 
          }
          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateSIPNeed()
  {
    $("#mi_amount_sip_need").val("");
    $("#mi_period_sip_need").val("");
    $("#mi_returns_sip_need").val("");

    $("#SectionCalculationOutput").hide(); 
  }
  function EMICalc(loan_amount,loan_period,rate_of_interest)
  {
    var annualRate=rate_of_interest;
    var years=loan_period;
    //var investment=loan_amount;

    var monthlyRate = annualRate / 12 / 100;
    var months = years * 12;
    var EMIValue = 0;
    var formula=(Math.pow((1+monthlyRate),months));
    

      //percentage=(1 * (1+monthlyRate) * ((Math.pow((1+monthlyRate),months)) - 1)/monthlyRate);
      percentage=(loan_amount * monthlyRate * ((Math.pow((1+monthlyRate),months)) / ((Math.pow((1+monthlyRate),months)) - 1)));
      percentage=percentage.toFixed(2);
      //percentage=percentage-0.06;
      //console.log(percentage);

      return EMIValue=percentage;
      
  }
  function CalculateLoanEMI()
  {
    var loan_amount=$("#mi_loan_amount").val();
    var loan_period=$("#mi_loan_period").val();
    var loan_roi=$("#mi_loan_roi").val();

     var is_valid_cal=1; 
     if(loan_roi<1 || loan_roi>100)
    {
      is_valid_cal=0;

      $("#mi_loan_roi").css("border","1px solid red");
      $("#mi_loan_roi").focus();
      $("#mi_loan_roi").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_loan_roi").css("border","");
        $("#mi_loan_roi").next(".help").html("");
    }
    if(loan_period<1 || loan_period>30)
    {
      is_valid_cal=0;

      $("#mi_loan_period").css("border","1px solid red");
      $("#mi_loan_period").focus();
      $("#mi_loan_period").next(".help").html("Enter Period between 1 & 30 ");
    }else
    {
        $("#mi_loan_period").css("border","");
        $("#mi_loan_period").next(".help").html("");
    }

    

    if(loan_amount<5000 || loan_amount>100000000)
    {
      is_valid_cal=0;

      $("#mi_loan_amount").css("border","1px solid red");
      $("#mi_loan_amount").focus();
      $("#mi_loan_amount").next(".help").html("Enter amount between 5000 & 10,00,00,000 ");
    }else
    {
        $("#mi_loan_amount").css("border","");
        $("#mi_loan_amount").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
          
          var estimated_emi_amount=EMICalc(loan_amount,loan_period,loan_roi); 
          var emi_total_months=loan_period*12;
          var total_loan_amount_paid=estimated_emi_amount*emi_total_months;
          var total_interest_paid=total_loan_amount_paid-loan_amount;
          //var sip_total_earning=estimated_emi_amount-sip_total_invest;
          console.log(estimated_emi_amount);
          console.log(emi_total_months);
          console.log(total_loan_amount_paid);

          /*estimated_emi_amount=estimated_emi_amount.toFixed(2);
          total_loan_amount_paid=total_loan_amount_paid.toFixed(2);
          total_interest_paid=total_interest_paid.toFixed(2);*/

           $("#td-estimated-emi-amount").html(FormatIndianCurrancy(estimated_emi_amount));
           $("#td-loan-period-years").html(loan_period+" Years");
           $("#td-loan-roi").html(loan_roi+"%");
           $("#td-total-loan-installments").html(emi_total_months);
           $("#td-total-loan-amount-pay").html(FormatIndianCurrancy(estimated_emi_amount*emi_total_months));
           $("#td-total-loan-installment-pay").html(FormatIndianCurrancy(estimated_emi_amount*emi_total_months-loan_amount));
           
            

          /*sip_total_invest=sip_total_invest.toFixed(2);
          estimated_emi_amount=estimated_emi_amount.toFixed(2);
          //sip_total_earning=sip_total_earning.toFixed(2);
          $("#td-monthly-sip-invest").html(FormatIndianCurrancy(estimated_emi_amount));
          $("#td-sip-plan-target-amount1").html(FormatIndianCurrancy(sip_amount));
          $("#td-sip-plan-target-amount2").html(FormatIndianCurrancy(sip_amount));
          $("#td-sip-plan-time").html(sip_period+" Years");
          $("#td-total-sip-invest").html(FormatIndianCurrancy(sip_total_invest));
          $("#td-total-sip-installment").html(sip_total_months);*/
          
          //console.log(sip_earning);
          

          
          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateLoanEMI()
  {
    $("#mi_loan_amount").val("");
    $("#mi_loan_period").val("");
    $("#mi_loan_roi").val("");
    


    $("#SectionCalculationOutput").hide(); 
  }
  function CalculateELSS()
  {
    var investment_amount=$("#mi_investment_amount").val();
    var tax_slab=$("#mi_tax_slab").val();
    

     var is_valid_cal=1; 
    if(investment_amount<5000 || investment_amount>150000)
    {
      is_valid_cal=0;

      $("#mi_investment_amount").css("border","1px solid red");
      $("#mi_investment_amount").focus();
      $("#mi_investment_amount").next(".help").html("Enter amount between 5000 & 1,50,000 ");
    }else
    {
        $("#mi_investment_amount").css("border","");
        $("#mi_investment_amount").next(".help").html("");
    }
    if(tax_slab=="")
    {
      is_valid_cal=0;

      $("#mi_tax_slab").css("border","1px solid red");
      $("#mi_tax_slab").focus();
      $("#mi_tax_slab").next(".help").html("Select Tax Slab");
    }else
    {
        $("#mi_tax_slab").css("border","");
        $("#mi_tax_slab").next(".help").html("");
    }

    

    

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
      tax_slab=parseFloat(tax_slab);
      investment_amount=parseFloat(investment_amount);
          var additional_tax_rate= (((tax_slab/10)*3)/10);
          //var additional_tax_rate= (((tax_slab/10)*3)/10)*(tax_slab/10);
          var apply_tax_rate=tax_slab+additional_tax_rate;
          var claim_deduction=(investment_amount*apply_tax_rate)/100;

          /*console.log(additional_tax_rate);
          console.log(apply_tax_rate);
          console.log(claim_deduction);*/

          //var sip_total_earning=estimated_emi_amount-sip_total_invest;
          

          /*estimated_emi_amount=estimated_emi_amount.toFixed(2);
          total_loan_amount_paid=total_loan_amount_paid.toFixed(2);
          total_interest_paid=total_interest_paid.toFixed(2);*/

           $("#td-tax-amount").html(FormatIndianCurrancy(investment_amount));
           $("#td-tax-slab-rate").html(tax_slab+"%");
           $("#td-tax-claimed-amount").html(FormatIndianCurrancy(claim_deduction));
           
           
            

          /*sip_total_invest=sip_total_invest.toFixed(2);
          estimated_emi_amount=estimated_emi_amount.toFixed(2);
          //sip_total_earning=sip_total_earning.toFixed(2);
          $("#td-monthly-sip-invest").html(FormatIndianCurrancy(estimated_emi_amount));
          $("#td-sip-plan-target-amount1").html(FormatIndianCurrancy(sip_amount));
          $("#td-sip-plan-target-amount2").html(FormatIndianCurrancy(sip_amount));
          $("#td-sip-plan-time").html(sip_period+" Years");
          $("#td-total-sip-invest").html(FormatIndianCurrancy(sip_total_invest));
          $("#td-total-sip-installment").html(sip_total_months);*/
          
          //console.log(sip_earning);
          

          
          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateELSS()
  {
    $("#mi_tax_slab").val("");
    $("#mi_investment_amount").val("");
    


    $("#SectionCalculationOutput").hide(); 
  }
  function ChildEduCalc(edu_cost_amount,maturity_period,sip_expected_returns)
  {
    var annualRate=sip_expected_returns;
    var years=maturity_period;
    var investment=edu_cost_amount;

    var monthlyRate = annualRate / 12 / 100;
    var months = years * 12;
    var futureValue = 0;

    
      percentage=(investment * Math.pow((1 + (sip_expected_returns / (1 * 100))), (1 * maturity_period)));
      //percentage=(investment *  (((Math.pow((1+monthlyRate),months)) - 1)/monthlyRate));
      //futureValue=investment*percentage;
      percentage=percentage.toFixed(2);
      //percentage=percentage-0.06;
      //return futureValue=investment*percentage;
      return futureValue=percentage;
      //console.log(futureValue);
  }
  function ChildEduCalc2(estimated_amount,maturity_period,sip_expected_returns)
  {
    var annualRate=sip_expected_returns;
    var years=maturity_period;
    //var investment=edu_cost_amount;

    var monthlyRate = annualRate / 12 / 100;
    var months = years * 12;
    var futureValue = 0;

    
      percentage=(estimated_amount / Math.pow((1 + (sip_expected_returns / (1 * 100))), (1 * maturity_period)));

      estimated_amount
      //percentage=(investment *  (((Math.pow((1+monthlyRate),months)) - 1)/monthlyRate));
      //futureValue=investment*percentage;
      percentage=percentage.toFixed(2);
      //percentage=percentage-0.06;
      //return futureValue=investment*percentage;
      return futureValue=percentage;
      //console.log(futureValue);
  }
  function CalculateChildEduPlan()
  {
    var education_cost_amount=$("#mi_education_cost_child_edu").val();
    var maturity_period=$("#mi_maturity_period_child_edu").val();
    var savings_increment=$("#mi_estimate_icrease_savings_child_edu").val();
    var expected_returns_rate=$("#mi_rate_of_return_child_edu").val();
    var infliation_rate=$("#mi_rate_of_inflation_child_edu").val();

     var is_valid_cal=1; 
     if(infliation_rate<1 || infliation_rate>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_inflation_child_edu").css("border","1px solid red");
      $("#mi_rate_of_inflation_child_edu").focus();
      $("#mi_rate_of_inflation_child_edu").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
      $("#mi_rate_of_inflation_child_edu").css("border","");
      $("#mi_rate_of_inflation_child_edu").next(".help").html("");
    }
     if(expected_returns_rate<1 || expected_returns_rate>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_return_child_edu").css("border","1px solid red");
      $("#mi_rate_of_return_child_edu").focus();
      $("#mi_rate_of_return_child_edu").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_rate_of_return_child_edu").css("border","");
        $("#mi_rate_of_return_child_edu").next(".help").html("");
    }
     if(savings_increment<1 || savings_increment>100)
    {
      is_valid_cal=0;

      $("#mi_estimate_icrease_savings_child_edu").css("border","1px solid red");
      $("#mi_estimate_icrease_savings_child_edu").focus();
      $("#mi_estimate_icrease_savings_child_edu").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_estimate_icrease_savings_child_edu").css("border","");
        $("#mi_estimate_icrease_savings_child_edu").next(".help").html("");
    }
    if(maturity_period<1 || maturity_period>30)
    {
      is_valid_cal=0;

      $("#mi_maturity_period_child_edu").css("border","1px solid red");
      $("#mi_maturity_period_child_edu").focus();
      $("#mi_maturity_period_child_edu").next(".help").html("Enter Period between 1 & 30 ");
    }else
    {
        $("#mi_maturity_period_child_edu").css("border","");
        $("#mi_maturity_period_child_edu").next(".help").html("");
    }

    

    if(education_cost_amount<10000 || education_cost_amount>100000000)
    {
      is_valid_cal=0;

        $("#mi_education_cost_child_edu").css("border","1px solid red");
        $("#mi_education_cost_child_edu").focus();
        $("#mi_education_cost_child_edu").next(".help").html("Enter amount between 10,000 & 10,00,00,000 ");
    }else
    {
        $("#mi_education_cost_child_edu").css("border","");
        $("#mi_education_cost_child_edu").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
          /*var education_cost_amount=$("#mi_education_cost_child_edu").val();
          var maturity_period=$("#mi_maturity_period_child_edu").val();
          var savings_increment=$("#mi_estimate_icrease_savings_child_edu").val();
          var expected_returns_rate=$("#mi_rate_of_return_child_edu").val();
          var infliation_rate=$("#mi_rate_of_inflation_child_edu").val();*/

          var estimated_returns_amount=ChildEduCalc(education_cost_amount,maturity_period,expected_returns_rate); 
          var estimated_education_amount=ChildEduCalc(education_cost_amount,maturity_period,infliation_rate);
          
          var estimated_investment_amount=ChildEduCalc2(estimated_education_amount,maturity_period,expected_returns_rate); 
          var estimated_investment_amount_yearly=estimated_investment_amount/maturity_period;
          var estimated_investment_amount_monthly=estimated_investment_amount/(maturity_period*12);
          /*var emi_total_months=loan_period*12;
          var total_loan_amount_paid=estimated_emi_amount*emi_total_months;
          var total_interest_paid=total_loan_amount_paid-loan_amount;*/
          //var sip_total_earning=estimated_emi_amount-sip_total_invest;
          /*console.log(estimated_education_amount);
          //console.log(estimated_returns_amount);
          console.log(estimated_investment_amount);
          console.log(estimated_investment_amount_yearly);
          console.log(estimated_investment_amount_monthly);*/

          $("#td-expected-edu-cost").html(FormatIndianCurrancy(estimated_education_amount));
          $("#td-time-period").html(maturity_period+" Years");
          $("#td-inflation-rate").html(infliation_rate+" %");
          $("#td-return-rate").html(expected_returns_rate+" %");
          $("#td-estimated-monthly-investment").html(FormatIndianCurrancy(estimated_investment_amount_monthly));
          $("#td-estimated-yearly-investment").html(FormatIndianCurrancy(estimated_investment_amount_yearly));
          $("#td-estimated-onetime-investment").html(FormatIndianCurrancy(estimated_investment_amount));
          /*console.log(emi_total_months);
          console.log(total_loan_amount_paid);*/

          /*estimated_emi_amount=estimated_emi_amount.toFixed(2);
          total_loan_amount_paid=total_loan_amount_paid.toFixed(2);
          total_interest_paid=total_interest_paid.toFixed(2);*/

           /*$("#td-estimated-emi-amount").html(FormatIndianCurrancy(estimated_emi_amount));
           $("#td-loan-period-years").html(loan_period+" Years");
           $("#td-loan-roi").html(loan_roi+"%");
           $("#td-total-loan-installments").html(emi_total_months);
           $("#td-total-loan-amount-pay").html(FormatIndianCurrancy(estimated_emi_amount*emi_total_months));
           $("#td-total-loan-installment-pay").html(FormatIndianCurrancy(estimated_emi_amount*emi_total_months-loan_amount));*/
           
            
          
          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateChildEduPlan()
  {
    
    $("#mi_education_cost_child_edu").val("");
    $("#mi_maturity_period_child_edu").val("");
    $("#mi_estimate_icrease_savings_child_edu").val("");
    $("#mi_rate_of_return_child_edu").val("");
    $("#mi_rate_of_inflation_child_edu").val("");
    


    $("#SectionCalculationOutput").hide(); 
  }
  function CalculateSingleGoalPlan()
  {
    var education_cost_amount=$("#mi_education_cost_single_goal").val();
    var maturity_period=$("#mi_maturity_period_single_goal").val();
    var savings_increment=$("#mi_estimate_icrease_savings_single_goal").val();
    var expected_returns_rate=$("#mi_rate_of_return_single_goal").val();
    var infliation_rate=$("#mi_rate_of_inflation_single_goal").val();
    var consider_inflation="0";
    if($("#mi_consider_inflation_single_goal").prop('checked'))
    {
      consider_inflation="1";
    }

     var is_valid_cal=1; 
     if(infliation_rate<1 || infliation_rate>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_inflation_single_goal").css("border","1px solid red");
      $("#mi_rate_of_inflation_single_goal").focus();
      $("#mi_rate_of_inflation_single_goal").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
      $("#mi_rate_of_inflation_single_goal").css("border","");
      $("#mi_rate_of_inflation_single_goal").next(".help").html("");
    }
     if(expected_returns_rate<1 || expected_returns_rate>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_return_single_goal").css("border","1px solid red");
      $("#mi_rate_of_return_single_goal").focus();
      $("#mi_rate_of_return_single_goal").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_rate_of_return_single_goal").css("border","");
        $("#mi_rate_of_return_single_goal").next(".help").html("");
    }
     if(savings_increment<1 || savings_increment>100)
    {
      is_valid_cal=0;

      $("#mi_estimate_icrease_savings_single_goal").css("border","1px solid red");
      $("#mi_estimate_icrease_savings_single_goal").focus();
      $("#mi_estimate_icrease_savings_single_goal").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_estimate_icrease_savings_single_goal").css("border","");
        $("#mi_estimate_icrease_savings_single_goal").next(".help").html("");
    }
    if(maturity_period<1 || maturity_period>30)
    {
      is_valid_cal=0;

      $("#mi_maturity_period_single_goal").css("border","1px solid red");
      $("#mi_maturity_period_single_goal").focus();
      $("#mi_maturity_period_single_goal").next(".help").html("Enter Period between 1 & 30 ");
    }else
    {
        $("#mi_maturity_period_single_goal").css("border","");
        $("#mi_maturity_period_single_goal").next(".help").html("");
    }

    

    if(education_cost_amount<10000 || education_cost_amount>100000000)
    {
      is_valid_cal=0;

        $("#mi_education_cost_single_goal").css("border","1px solid red");
        $("#mi_education_cost_single_goal").focus();
        $("#mi_education_cost_single_goal").next(".help").html("Enter amount between 10,000 & 10,00,00,000 ");
    }else
    {
        $("#mi_education_cost_single_goal").css("border","");
        $("#mi_education_cost_single_goal").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
          

          var estimated_returns_amount=ChildEduCalc(education_cost_amount,maturity_period,expected_returns_rate); 
          if(consider_inflation=="1")
          {          
            var estimated_education_amount=ChildEduCalc(education_cost_amount,maturity_period,infliation_rate);
          }else
          {
            var estimated_education_amount=education_cost_amount;
          }
          
          var estimated_investment_amount=ChildEduCalc2(estimated_education_amount,maturity_period,expected_returns_rate); 
          var estimated_investment_amount_yearly=estimated_investment_amount/maturity_period;
          var estimated_investment_amount_monthly=estimated_investment_amount/(maturity_period*12);
          
          $("#td-expected-edu-cost").html(FormatIndianCurrancy(estimated_education_amount));
          $("#td-time-period").html(maturity_period+" Years");
          $("#td-inflation-rate").html(infliation_rate+" %");
          $("#td-return-rate").html(expected_returns_rate+" %");
          $("#td-estimated-monthly-investment").html(FormatIndianCurrancy(estimated_investment_amount_monthly));
          $("#td-estimated-yearly-investment").html(FormatIndianCurrancy(estimated_investment_amount_yearly));
          $("#td-estimated-onetime-investment").html(FormatIndianCurrancy(estimated_investment_amount));
          if(consider_inflation=="1")
          {
            $("#td-consider-inflation").html("With Considering Inflation");
          }else
          {
            $("#td-consider-inflation").html("Without Considering Inflation");
          }
          
          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateSingleGoalPlan()
  {
    
    $("#mi_education_cost_single_goal").val("");
    $("#mi_maturity_period_single_goal").val("");
    $("#mi_estimate_icrease_savings_single_goal").val("");
    $("#mi_rate_of_return_single_goal").val("");
    $("#mi_rate_of_inflation_single_goal").val("");
    


    $("#SectionCalculationOutput").hide(); 
  }
  function CalculateDownpaymentCar()
  {
    var loan_amount=$("#mi_education_cost_single_goal").val();
    var downpayment_rate=$("#mi_rate_of_down_payment_single_goal").val();

    loan_amount=parseFloat(loan_amount);
    downpayment_rate=parseFloat(downpayment_rate);
    var downpayment_amount=0;
    if(loan_amount>0 && downpayment_rate>0)
    {
      //console.log(loan_amount);
      //console.log(downpayment_rate);
     downpayment_amount=((loan_amount*downpayment_rate)/100);
      
    }
    
    
    $("#mi_rate_of_amount_down_payment_single_goal").val(downpayment_amount);
  }

  function CalculateHomeCarLoanPlan()
  {
    var education_cost_amount=$("#mi_education_cost_single_goal").val();
    var maturity_period=$("#mi_maturity_period_single_goal").val();
    var savings_increment=$("#mi_estimate_icrease_savings_single_goal").val();
    var expected_returns_rate=$("#mi_rate_of_return_single_goal").val();
    var infliation_rate=$("#mi_rate_of_inflation_single_goal").val();
    var down_payment_rate= $("#mi_rate_of_down_payment_single_goal").val();
    var down_payment_amount=$("#mi_rate_of_amount_down_payment_single_goal").val();
    var loan_interest_rate=$("#mi_rate_of_loan_interest_single_goal").val();
    var loan_period=$("#mi_Loan_period_single_goal").val();
    var consider_inflation="1";
    

     var is_valid_cal=1; 
     if(infliation_rate<1 || infliation_rate>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_inflation_single_goal").css("border","1px solid red");
      $("#mi_rate_of_inflation_single_goal").focus();
      $("#mi_rate_of_inflation_single_goal").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
      $("#mi_rate_of_inflation_single_goal").css("border","");
      $("#mi_rate_of_inflation_single_goal").next(".help").html("");
    }
     if(expected_returns_rate<1 || expected_returns_rate>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_return_single_goal").css("border","1px solid red");
      $("#mi_rate_of_return_single_goal").focus();
      $("#mi_rate_of_return_single_goal").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_rate_of_return_single_goal").css("border","");
        $("#mi_rate_of_return_single_goal").next(".help").html("");
    }
     if(savings_increment<1 || savings_increment>100)
    {
      is_valid_cal=0;

      $("#mi_estimate_icrease_savings_single_goal").css("border","1px solid red");
      $("#mi_estimate_icrease_savings_single_goal").focus();
      $("#mi_estimate_icrease_savings_single_goal").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_estimate_icrease_savings_single_goal").css("border","");
        $("#mi_estimate_icrease_savings_single_goal").next(".help").html("");
    }
    if(maturity_period<1 || maturity_period>30)
    {
      is_valid_cal=0;

      $("#mi_maturity_period_single_goal").css("border","1px solid red");
      $("#mi_maturity_period_single_goal").focus();
      $("#mi_maturity_period_single_goal").next(".help").html("Enter Period between 1 & 30 ");
    }else
    {
        $("#mi_maturity_period_single_goal").css("border","");
        $("#mi_maturity_period_single_goal").next(".help").html("");
    }

    

    if(education_cost_amount<10000 || education_cost_amount>100000000)
    {
      is_valid_cal=0;

        $("#mi_education_cost_single_goal").css("border","1px solid red");
        $("#mi_education_cost_single_goal").focus();
        $("#mi_education_cost_single_goal").next(".help").html("Enter amount between 10,000 & 10,00,00,000 ");
    }else
    {
        $("#mi_education_cost_single_goal").css("border","");
        $("#mi_education_cost_single_goal").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
         var estimated_downpayment_amount=ChildEduCalc(down_payment_amount,maturity_period,infliation_rate); 


          var estimated_returns_amount=ChildEduCalc(education_cost_amount,maturity_period,expected_returns_rate); 
          if(consider_inflation=="1")
          {          
            var estimated_education_amount=ChildEduCalc(education_cost_amount,maturity_period,infliation_rate);
          }else
          {
            var estimated_education_amount=education_cost_amount;
          }
          
          var estimated_investment_amount=ChildEduCalc2(estimated_downpayment_amount,maturity_period,expected_returns_rate); 
          var estimated_investment_amount_yearly=estimated_investment_amount/maturity_period;
          var estimated_investment_amount_monthly=estimated_investment_amount/(maturity_period*12);
          var loan_amount=estimated_returns_amount-estimated_downpayment_amount;
          var estimated_emi_amount=EMICalc(loan_amount,loan_period,loan_interest_rate); 

          // console.log(estimated_downpayment_amount);
          // console.log(estimated_returns_amount);
          // console.log(estimated_returns_amount-estimated_downpayment_amount);
          // console.log(estimated_emi_amount);
          // console.log(estimated_investment_amount);

          //console.log(estimated_investment_amount);

          $("#td-expected-down_payment-cost").html(FormatIndianCurrancy(estimated_downpayment_amount));
          $("#td-time-period").html(maturity_period+" Years");
          $("#td-expected-loan-interest-rate").html(loan_period+" Years");
          $("#td-inflation-rate").html(infliation_rate+" %");
          $("#td-return-rate").html(expected_returns_rate+" %");
          $("#td-expected-loan-interest-rate").html(loan_interest_rate+" %");
          $("#td-estimated-monthly-investment").html(FormatIndianCurrancy(estimated_investment_amount_monthly));
          $("#td-estimated-yearly-investment").html(FormatIndianCurrancy(estimated_investment_amount_yearly));
          $("#td-estimated-onetime-investment").html(FormatIndianCurrancy(estimated_investment_amount));
          $("#td-estimated-loan-component-asset").html(FormatIndianCurrancy((estimated_returns_amount-estimated_downpayment_amount)));
          $("#td-estimated-loan-emi").html(FormatIndianCurrancy(estimated_emi_amount));

          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateHomeCarLoanPlan()
  {
    
    $("#mi_education_cost_single_goal").val("");
    $("#mi_maturity_period_single_goal").val("");
    $("#mi_estimate_icrease_savings_single_goal").val("");
    $("#mi_rate_of_return_single_goal").val("");
    $("#mi_rate_of_inflation_single_goal").val("");
    
    $("#mi_rate_of_down_payment_single_goal").val("");
    $("#mi_rate_of_amount_down_payment_single_goal").val("");
    $("#mi_rate_of_loan_interest_single_goal").val("");
    $("#mi_Loan_period_single_goal").val("");

    $("#SectionCalculationOutput").hide(); 
  }
  function CalculateRetirementPlan()
  {
    var current_age=$("#mi_current_age_retirement").val();
    var retirement_age=$("#mi_retirement_age_retirement").val();
    var mi_monthly_expense=$("#mi_monthly_expense_retirement").val();
    var mi_rate_of_return=$("#mi_rate_of_return_retirement").val();
    var mi_rate_of_increment_savings=$("#mi_rate_of_increment_savings_retirement").val();
    var mi_existing_investment= $("#mi_existing_investment_retirement").val();
    var mi_return_rate_of_existing_return=$("#mi_return_rate_of_existing_return_retirement").val();
    var life_expectancy=$("#mi_life_expectancy_retirement").val();
    var mi_pre_rate_of_inflation=$("#mi_pre_rate_of_inflation_retirement").val();
    var mi_post_rate_of_inflation=$("#mi_post_rate_of_inflation_retirement").val();
    var mi_rate_of_return_kitty=$("#mi_rate_of_return_kitty_retirement").val();
    var consider_inflation="1";
    

     var is_valid_cal=1; 
     if(current_age<18 || current_age>100)
    {
      is_valid_cal=0;

      $("#mi_current_age_retirement").css("border","1px solid red");
      $("#mi_current_age_retirement").focus();
      $("#mi_current_age_retirement").next(".help").html("Enter Current Age value between 18 & 100 ");
    }else
    {
      $("#mi_current_age_retirement").css("border","");
      $("#mi_current_age_retirement").next(".help").html("");
    }
    if(retirement_age<18 || retirement_age>100)
    {
      is_valid_cal=0;

      $("#mi_retirement_age_retirement").css("border","1px solid red");
      $("#mi_retirement_age_retirement").focus();
      $("#mi_retirement_age_retirement").next(".help").html("Enter Current Age value between 18 & 100 ");
    }else
    {
      if(retirement_age>current_age)
      {
        $("#mi_retirement_age_retirement").css("border","");
        $("#mi_retirement_age_retirement").next(".help").html("");
      }else
      {
        is_valid_cal=0;

        $("#mi_retirement_age_retirement").css("border","1px solid red");
        $("#mi_retirement_age_retirement").focus();
        $("#mi_retirement_age_retirement").next(".help").html("Enter Retirement Age value greater than Current Age");
      }
      
    }
    if(mi_rate_of_return<1 || mi_rate_of_return>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_return_retirement").css("border","1px solid red");
      $("#mi_rate_of_return_retirement").focus();
      $("#mi_rate_of_return_retirement").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
      $("#mi_rate_of_return_retirement").css("border","");
      $("#mi_rate_of_return_retirement").next(".help").html("");
    }
     if(mi_rate_of_increment_savings<1 || mi_rate_of_increment_savings>100)
    {
      is_valid_cal=0;

      $("#mi_rate_of_increment_savings_retirement").css("border","1px solid red");
      $("#mi_rate_of_increment_savings_retirement").focus();
      $("#mi_rate_of_increment_savings_retirement").next(".help").html("Enter Rate Of Intrest value between 1 & 100 ");
    }else
    {
        $("#mi_rate_of_increment_savings_retirement").css("border","");
        $("#mi_rate_of_increment_savings_retirement").next(".help").html("");
    }
     if(mi_post_rate_of_inflation<1 || mi_post_rate_of_inflation>100)
    {
      is_valid_cal=0;

      $("#mi_post_rate_of_inflation_retirement").css("border","1px solid red");
      $("#mi_post_rate_of_inflation_retirement").focus();
      $("#mi_post_rate_of_inflation_retirement").next(".help").html("Enter Rate Of Inflation value between 1 & 100 ");
    }else
    {
        $("#mi_post_rate_of_inflation_retirement").css("border","");
        $("#mi_post_rate_of_inflation_retirement").next(".help").html("");
    }
    if(mi_pre_rate_of_inflation<1 || mi_pre_rate_of_inflation>100)
    {
      is_valid_cal=0;

      $("#mi_pre_rate_of_inflation_retirement").css("border","1px solid red");
      $("#mi_pre_rate_of_inflation_retirement").focus();
      $("#mi_pre_rate_of_inflation_retirement").next(".help").html("Enter Rate Of Inflation value between 1 & 100 ");
    }else
    {
        $("#mi_pre_rate_of_inflation_retirement").css("border","");
        $("#mi_pre_rate_of_inflation_retirement").next(".help").html("");
    }
    

    

    if(mi_monthly_expense<10000 || mi_monthly_expense>100000000)
    {
      is_valid_cal=0;

        $("#mi_monthly_expense_retirement").css("border","1px solid red");
        $("#mi_monthly_expense_retirement").focus();
        $("#mi_monthly_expense_retirement").next(".help").html("Enter amount between 10,000 & 10,00,00,000 ");
    }else
    {
        $("#mi_monthly_expense_retirement").css("border","");
        $("#mi_monthly_expense_retirement").next(".help").html("");
    }

    
      //console.log(is_valid_cal);
    if(is_valid_cal==1)
    {  
        var pre_retirement_period=retirement_age-current_age;
        var post_retirement_period=life_expectancy-retirement_age;
         var estimated_monthly_expense=ChildEduCalc(mi_monthly_expense,pre_retirement_period,mi_pre_rate_of_inflation); 
         var estimated_investment_returns=ChildEduCalc(mi_existing_investment,pre_retirement_period,mi_return_rate_of_existing_return); 
         var retirement_kitty=0;
         retirement_kitty=post_retirement_period*estimated_monthly_expense;
         if(mi_rate_of_return_kitty==mi_post_rate_of_inflation)
         {
            retirement_kitty=post_retirement_period*(estimated_monthly_expense*12);
         }else
         {

            retirement_est_sav=ChildEduCalc((mi_monthly_expense*12),post_retirement_period,mi_rate_of_return_kitty);
            retirement_est_exp=ChildEduCalc((mi_monthly_expense*12),post_retirement_period,mi_post_rate_of_inflation);
            retirement_kitty=post_retirement_period*(estimated_monthly_expense*12);
            var amount_difference=0;
            if(mi_post_rate_of_inflation>mi_rate_of_return_kitty)
            {
              amount_difference=retirement_est_exp-retirement_est_sav;
              retirement_kitty=retirement_kitty+amount_difference;
            }else
            {
              amount_difference=retirement_est_sav-retirement_est_exp;
              retirement_kitty=retirement_kitty-amount_difference;
            }
         }
         amount_required=retirement_kitty;
         if(estimated_investment_returns>0)
         {
            amount_required=retirement_kitty-estimated_investment_returns;
         }
         // console.log(estimated_monthly_expense);
         // console.log(estimated_investment_returns);
         // console.log(retirement_kitty);
         
          var estimated_investment_amount=ChildEduCalc2(amount_required,pre_retirement_period,mi_rate_of_return); 
          var estimated_investment_amount_yearly=estimated_investment_amount/pre_retirement_period;
          var estimated_investment_amount_monthly=estimated_investment_amount/(pre_retirement_period*12); 

          $("#str-current_age").html(current_age);
          $("#str-retirement_age").html(retirement_age);
          $("#str-life_expetancy").html(life_expectancy+" Years");
          $("#str-pre_retirement_years").html(pre_retirement_period);
          $("#str-post_retirement_years").html(post_retirement_period);
          $("#str-pre_retirement_inflation").html(mi_pre_rate_of_inflation);
          $("#str-post_retirement_inflation").html(mi_post_rate_of_inflation);
          $("#str-existing_returns").html(mi_return_rate_of_existing_return+" %");
          $("#str-new_returns").html(mi_rate_of_return+" %");
          $("#str-kitty_returns").html(mi_rate_of_return_kitty+" %");

          

          $("#td-estimated-monthly-investment-on-retirement").html(FormatIndianCurrancy(estimated_monthly_expense));
          $("#td-future-value-investment-on-retirement").html(FormatIndianCurrancy(estimated_investment_returns));
          $("#td-retirement-kitty-on-retirement").html(FormatIndianCurrancy(retirement_kitty));
          $("#td-shortfall-retirement-kitty-on-retirement").html(FormatIndianCurrancy(amount_required));
          
          
          $("#td-return-rate").html(mi_rate_of_return+" %");
          
          $("#td-estimated-monthly-investment").html(FormatIndianCurrancy(estimated_investment_amount_monthly));
          $("#td-estimated-yearly-investment").html(FormatIndianCurrancy(estimated_investment_amount_yearly));
          $("#td-estimated-onetime-investment").html(FormatIndianCurrancy(estimated_investment_amount));
          

          $("#SectionCalculationOutput").show();
    }else
    {
         $("#SectionCalculationOutput").hide(); 
    }
  }
  function ResetCalculateRetirementPlan()
  {
    
    $("#mi_current_age_retirement").val("");
    $("#mi_retirement_age_retirement").val("");
    $("#mi_monthly_expense_retirement").val("");
    $("#mi_rate_of_return_retirement").val("");
    $("#mi_rate_of_increment_savings_retirement").val("");
    $("#mi_existing_investment_retirement").val("");
    $("#mi_return_rate_of_existing_return_retirement").val("");
    $("#mi_life_expectancy_retirement").val("");
    $("#mi_pre_rate_of_inflation_retirement").val("");
    $("#mi_post_rate_of_inflation_retirement").val("");
    $("#mi_rate_of_return_kitty_retirement").val("");


    $("#SectionCalculationOutput").hide(); 
  }