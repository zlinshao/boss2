<template>
    <div>
        <div class="row">
            <div class="col-lg-6">
                <!--notification start-->
                <section class="panel">
                    <div class="panel-body">
                        <div class="alert alert-success alert-block fade in">
                            <button data-dismiss="alert" class="close close-sm" type="button">
                                <i class="icon-remove"></i>
                            </button>
                            <h4>
                                <i class="icon-ok-sign"></i>
                                Success!
                            </h4>
                            <p>Best check yo self, you're not looking too good...</p>
                        </div>
                        <div class="alert alert-block alert-danger fade in">
                            <button data-dismiss="alert" class="close close-sm" type="button">
                                <i class="icon-remove"></i>
                            </button>
                            <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </div>
                        <div class="alert alert-success fade in">
                            <button data-dismiss="alert" class="close close-sm" type="button">
                                <i class="icon-remove"></i>
                            </button>
                            <strong>Well done!</strong> You successfully read this important alert message.
                        </div>
                        <div class="alert alert-info fade in">
                            <button data-dismiss="alert" class="close close-sm" type="button">
                                <i class="icon-remove"></i>
                            </button>
                            <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                        </div>
                        <div class="alert alert-warning fade in">
                            <button data-dismiss="alert" class="close close-sm" type="button">
                                <i class="icon-remove"></i>
                            </button>
                            <strong>Warning!</strong> Best check yo self, you're not looking too good.
                        </div>

                    </div>
                </section>
                <!--notification end-->

                <!--tab nav start-->
                <section class="panel">
                    <header class="panel-heading tab-bg-dark-navy-blue ">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a data-toggle="tab" href="#home">Home</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#about">About</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#profile">Profile</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </header>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="home" class="tab-pane active">
                                Home
                            </div>
                            <div id="about" class="tab-pane">About</div>
                            <div id="profile" class="tab-pane">Profile</div>
                            <div id="contact" class="tab-pane">Contact</div>
                        </div>
                    </div>
                </section>
                <!--tab nav start-->
                <!--tab nav start-->
                <section class="panel">
                    <header class="panel-heading tab-bg-dark-navy-blue">
                        <ul class="nav nav-tabs">
                            <li>
                                <a data-toggle="tab" href="#home-2">
                                    <i class="icon-home"></i>
                                </a>
                            </li>
                            <li class="active">
                                <a data-toggle="tab" href="#about-2">
                                    <i class="icon-user"></i>
                                    About
                                </a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#contact-2">
                                    <i class="icon-envelope"></i>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </header>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="home-2" class="tab-pane ">
                                Home
                            </div>
                            <div id="about-2" class="tab-pane active">About</div>
                            <div id="contact-2" class="tab-pane ">Contact</div>
                        </div>
                    </div>
                </section>
                <!--tab nav start-->

                <!--tab nav start-->
                <section class="panel">
                    <header class="panel-heading tab-bg-dark-navy-blue tab-right ">
                        <ul class="nav nav-tabs pull-right">
                            <li class="active">
                                <a data-toggle="tab" href="#home-3">
                                    <i class="icon-home"></i>
                                </a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#about-3">
                                    <i class="icon-user"></i>
                                    About
                                </a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#contact-3">
                                    <i class="icon-envelope"></i>
                                    Contact
                                </a>
                            </li>
                        </ul>
                        <span class="hidden-sm wht-color">Right tab</span>
                    </header>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="home-3" class="tab-pane active">
                                Home
                            </div>
                            <div id="about-3" class="tab-pane">About</div>
                            <div id="contact-3" class="tab-pane">Contact</div>
                        </div>
                    </div>
                </section>
                <!--tab nav start-->

                <!--navigation start-->
                <nav class="navbar navbar-inverse" role="navigation">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Brand</a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse navbar-ex1-collapse">
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="#">Link</a></li>
                            <li><a href="javascript:;">Link</a></li>
                            <li class="dropdown">
                                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li><a href="#">Separated link</a></li>
                                    <li><a href="#">One more separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                        <!--<form class="navbar-form navbar-left" role="search">-->
                        <!--<div class="form-group">-->
                        <!--<input type="text" class="form-control" placeholder="Search">-->
                        <!--</div>-->
                        <!--<button type="submit" class="btn btn-default">Submit</button>-->
                        <!--</form>-->
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="javascript:;">Link</a></li>
                            <li class="dropdown">
                                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </nav>

                <!--navigation end-->

                <!--tooltips start-->
                <section class="panel">
                    <div class="panel-body">
                        <button title="" data-placement="top" data-toggle="tooltip" class="btn btn-default tooltips" type="button" data-original-title="Tooltip on top">Tooltip on top</button>
                        <button title="" data-placement="left" data-toggle="tooltip" class="btn btn-default tooltips" type="button" data-original-title="Tooltip on left"> left</button>
                        <button title="Tooltip on bottom" data-placement="bottom" data-toggle="tooltip " class="btn btn-default tooltips" type="button"> bottom</button>
                        <button title="Tooltip on right" data-placement="right" data-toggle="tooltip" class="btn btn-default tooltips" type="button"> right</button>
                    </div>
                </section>
                <!--tooltips start-->

                <!--popover start-->
                <section class="panel">
                    <div class="panel-body">
                        <button data-original-title="Popovers in top" data-content="And here's some amazing content. It's very engaging. right?" data-placement="top" data-trigger="hover" class="btn btn-info popovers">Popover on Top</button>
                        <button data-original-title="Popovers in bottom" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-placement="bottom" data-trigger="hover" class="btn btn-info popovers">Bottom</button>
                        <button data-original-title="Popovers in right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-placement="right" data-trigger="hover" class="btn btn-info popovers">Right</button>
                        <button data-original-title="Popovers in left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-placement="left" data-trigger="hover" class="btn btn-info popovers">Left</button>
                    </div>
                </section>
                <!--popover start-->

                <!--modal start-->
                <section class="panel">
                    <header class="panel-heading">
                        Modal Dialogs
                    </header>
                    <div class="panel-body">
                        <a class="btn btn-success" data-toggle="modal" href="#myModal">
                            Dialog
                        </a>
                        <a class="btn btn-warning" data-toggle="modal" href="#myModal2">
                            Confirm
                        </a>
                        <a class="btn btn-danger" data-toggle="modal" href="#myModal3">
                            Alert !
                        </a>
                        <!-- Modal -->
                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title">Modal Tittle</h4>
                                    </div>
                                    <div class="modal-body">

                                        Body goes here...

                                    </div>
                                    <div class="modal-footer">
                                        <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
                                        <button class="btn btn-success" type="button">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- modal -->
                        <!-- Modal -->
                        <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title">Modal Tittle</h4>
                                    </div>
                                    <div class="modal-body">

                                        Body goes here...

                                    </div>
                                    <div class="modal-footer">
                                        <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
                                        <button class="btn btn-warning" type="button"> Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- modal -->
                        <!-- Modal -->
                        <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 class="modal-title">Modal Tittle</h4>
                                    </div>
                                    <div class="modal-body">

                                        Body goes here...

                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-danger" type="button"> Ok</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- modal -->

                    </div>
                </section>
                <!--modal start-->

                <!--carousel start-->
                <section class="panel">
                    <div id="c-slide" class="carousel slide auto panel-body">
                        <ol class="carousel-indicators out">
                            <li class="active" data-slide-to="0" data-target="#c-slide"></li>
                            <li class="" data-slide-to="1" data-target="#c-slide"></li>
                            <li class="" data-slide-to="2" data-target="#c-slide"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="item text-center active">
                                <h3>Flatlab is new model of Admin</h3>
                                <small class="text-muted">Based on Bootstrap 3</small>
                            </div>
                            <div class="item text-center">
                                <h3>Massive UI Elements</h3>
                                <small class="text-muted">Fully Responsive</small>
                            </div>
                            <div class="item text-center">
                                <h3>Well Documentation</h3>
                                <small class="text-muted">Easy to Use</small>
                            </div>
                        </div>
                        <a data-slide="prev" href="#c-slide" class="left carousel-control">
                            <i class="icon-angle-left"></i>
                        </a>
                        <a data-slide="next" href="#c-slide" class="right carousel-control">
                            <i class="icon-angle-right"></i>
                        </a>
                    </div>
                </section>
                <!--carousel end-->

                <!--gritter notification start-->
                <section class="panel">
                    <header class="panel-heading">
                        Gritter Notifications
                    </header>
                    <div class="panel-body">
                        <p class="text-muted">Click on below buttons to check it out.</p>
                        <a id="add-regular" class="btn btn-default btn-sm" href="javascript:;">Regular</a>
                        <a id="add-sticky" class="btn btn-success  btn-sm" href="javascript:;">Sticky</a>
                        <a id="add-without-image" class="btn btn-info  btn-sm" href="javascript:;">Imageless</a>

                        <a id="add-gritter-light" class="btn btn-warning  btn-sm" href="javascript:;">Light</a>
                        <a id="add-max" class="btn btn-primary  btn-sm" href="javascript:;">Max of 3</a>
                        <a id="remove-all" class="btn btn-danger  btn-sm" href="#">Remove all</a>
                    </div>
                </section>
                <!--gritter notification end-->

            </div>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>