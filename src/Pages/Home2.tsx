const Home2 = () => {
    return (<div>
  {/*
=========================================================
* Material Dashboard 2 - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://www.creative-tim.com/license)
* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/}
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png" />
  <link rel="icon" type="image/png" href="./assets/img/favicon.png" />
  <title>
    Material Dashboard 2 by Creative Tim
  </title>
  {/*     Fonts and icons     */}
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
  {/* Nucleo Icons */}
  <link href="./assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="./assets/css/nucleo-svg.css" rel="stylesheet" />
  {/* Font Awesome Icons */}
  {/* Material Icons */}
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
  {/* CSS Files */}
  <link id="pagestyle" href="./assets/css/material-dashboard.css?v=3.0.0" rel="stylesheet" />
  <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
      <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
        <img src="./assets/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
        <span className="ms-1 font-weight-bold text-white">Material Dashboard 2</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2" />
    <div className="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-white active bg-gradient-primary" href="./pages/dashboard.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">dashboard</i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/tables.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">table_view</i>
            </div>
            <span className="nav-link-text ms-1">Tables</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/billing.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">receipt_long</i>
            </div>
            <span className="nav-link-text ms-1">Billing</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/virtual-reality.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">view_in_ar</i>
            </div>
            <span className="nav-link-text ms-1">Virtual Reality</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/rtl.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
            </div>
            <span className="nav-link-text ms-1">RTL</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/notifications.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">notifications</i>
            </div>
            <span className="nav-link-text ms-1">Notifications</span>
          </a>
        </li>
        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/profile.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">person</i>
            </div>
            <span className="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/sign-in.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">login</i>
            </div>
            <span className="nav-link-text ms-1">Sign In</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white " href="./pages/sign-up.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">assignment</i>
            </div>
            <span className="nav-link-text ms-1">Sign Up</span>
          </a>
        </li>
      </ul>
    </div>
    <div className="sidenav-footer position-absolute w-100 bottom-0 ">
      <div className="mx-3">
        <a className="btn bg-gradient-primary mt-4 w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Upgrade to pro</a>
      </div>
    </div>
  </aside>
  <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    {/* Navbar */}
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Dashboard</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group input-group-outline">
              <label className="form-label">Type here...</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1" />
                <span className="d-sm-inline d-none">Sign In</span>
              </a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                </div>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer" />
              </a>
              <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="./assets/img/team-2.jpg" className="avatar avatar-sm  me-3 " />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New message</span> from Laur
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1" />
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="./assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 " />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New album</span> by Travis Scott
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1" />
                          1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                        <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <title>credit-card</title>
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(453.000000, 454.000000)">
                                  <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743" />
                                  <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z" />
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          Payment successfully completed
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1" />
                          2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* End Navbar */}
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">weekend</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Today's Money</p>
                <h4 className="mb-0">$53k</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+55% </span>than lask week</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Today's Users</p>
                <h4 className="mb-0">2,300</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span>than lask month</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">person</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">New Clients</p>
                <h4 className="mb-0">3,462</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">-2%</span> than yesterday</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10">weekend</i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Sales</p>
                <h4 className="mb-0">$103,430</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+5% </span>than yesterday</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2 ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                <div className="chart">
                  <canvas id="chart-bars" className="chart-canvas" height={170} />
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 ">Website Views</h6>
              <p className="text-sm ">Last Campaign Performance</p>
              <hr className="dark horizontal" />
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm"> campaign sent 2 days ago </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2  ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                <div className="chart">
                  <canvas id="chart-line" className="chart-canvas" height={170} />
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 "> Daily Sales </h6>
              <p className="text-sm "> (<span className="font-weight-bolder">+15%</span>) increase in today sales. </p>
              <hr className="dark horizontal" />
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm"> updated 4 min ago </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4 mb-3">
          <div className="card z-index-2 ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                <div className="chart">
                  <canvas id="chart-line-tasks" className="chart-canvas" height={170} />
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 ">Completed Tasks</h6>
              <p className="text-sm ">Last Campaign Performance</p>
              <hr className="dark horizontal" />
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm">just updated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
          <div className="card">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Projects</h6>
                  <p className="text-sm mb-0">
                    <i className="fa fa-check text-info" aria-hidden="true" />
                    <span className="font-weight-bold ms-1">30 done</span> this month
                  </p>
                </div>
                <div className="col-lg-6 col-5 my-auto text-end">
                  <div className="dropdown float-lg-end pe-4">
                    <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-ellipsis-v text-secondary" />
                    </a>
                    <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                      <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                      <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                      <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Companies</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Members</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Budget</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="./assets/img/small-logos/logo-xd.svg" className="avatar avatar-sm me-3" alt="xd" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Material XD Version</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="./assets/img/team-1.jpg" alt="team1" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="./assets/img/team-2.jpg" alt="team2" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                            <img src="./assets/img/team-3.jpg" alt="team3" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="./assets/img/team-4.jpg" alt="team4" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $14,000 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">60%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="./assets/img/small-logos/logo-atlassian.svg" className="avatar avatar-sm me-3" alt="atlassian" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Add Progress Track</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="./assets/img/team-2.jpg" alt="team5" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="./assets/img/team-4.jpg" alt="team6" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $3,000 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">10%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-10" role="progressbar" aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="./assets/img/small-logos/logo-slack.svg" className="avatar avatar-sm me-3" alt="team7" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Fix Platform Errors</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="./assets/img/team-3.jpg" alt="team8" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="./assets/img/team-1.jpg" alt="team9" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> Not set </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">100%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="./assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm me-3" alt="spotify" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Launch our Mobile App</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="./assets/img/team-4.jpg" alt="user1" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">
                            <img src="./assets/img/team-3.jpg" alt="user2" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">
                            <img src="./assets/img/team-4.jpg" alt="user3" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="./assets/img/team-1.jpg" alt="user4" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $20,500 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">100%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-success w-100" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="./assets/img/small-logos/logo-jira.svg" className="avatar avatar-sm me-3" alt="jira" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Add the New Pricing Page</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="./assets/img/team-4.jpg" alt="user5" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $500 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">25%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-25" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={25} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="./assets/img/small-logos/logo-invision.svg" className="avatar avatar-sm me-3" alt="invision" />
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">Redesign New Online Shop</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="avatar-group mt-2">
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                            <img src="./assets/img/team-1.jpg" alt="user6" />
                          </a>
                          <a href="javascript:;" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">
                            <img src="./assets/img/team-4.jpg" alt="user7" />
                          </a>
                        </div>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="text-xs font-weight-bold"> $2,000 </span>
                      </td>
                      <td className="align-middle">
                        <div className="progress-wrapper w-75 mx-auto">
                          <div className="progress-info">
                            <div className="progress-percentage">
                              <span className="text-xs font-weight-bold">40%</span>
                            </div>
                          </div>
                          <div className="progress">
                            <div className="progress-bar bg-gradient-info w-40" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={40} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card h-100">
            <div className="card-header pb-0">
              <h6>Orders overview</h6>
              <p className="text-sm">
                <i className="fa fa-arrow-up text-success" aria-hidden="true" />
                <span className="font-weight-bold">24%</span> this month
              </p>
            </div>
            <div className="card-body p-3">
              <div className="timeline timeline-one-side">
                <div className="timeline-block mb-3">
                  <span className="timeline-step">
                    <i className="material-icons text-success text-gradient">notifications</i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                  </div>
                </div>
                <div className="timeline-block mb-3">
                  <span className="timeline-step">
                    <i className="material-icons text-danger text-gradient">code</i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">New order #1832412</h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>
                  </div>
                </div>
                <div className="timeline-block mb-3">
                  <span className="timeline-step">
                    <i className="material-icons text-info text-gradient">shopping_cart</i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">Server payments for April</h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 9:34 PM</p>
                  </div>
                </div>
                <div className="timeline-block mb-3">
                  <span className="timeline-step">
                    <i className="material-icons text-warning text-gradient">credit_card</i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">New card added for order #4395133</h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">20 DEC 2:20 AM</p>
                  </div>
                </div>
                <div className="timeline-block mb-3">
                  <span className="timeline-step">
                    <i className="material-icons text-primary text-gradient">key</i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">Unlock packages for development</h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">18 DEC 4:54 AM</p>
                  </div>
                </div>
                <div className="timeline-block">
                  <span className="timeline-step">
                    <i className="material-icons text-dark text-gradient">payments</i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">New order #9583120</h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">17 DEC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer py-4  ">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © ,
                made with <i className="fa fa-heart" /> by
                <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Creative Tim</a>
                for a better web.
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" className="nav-link text-muted" target="_blank">Creative Tim</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/blog" className="nav-link text-muted" target="_blank">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </main>
  <div className="fixed-plugin">
    <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
      <i className="material-icons py-2">settings</i>
    </a>
    <div className="card shadow-lg">
      <div className="card-header pb-0 pt-3">
        <div className="float-start">
          <h5 className="mt-3 mb-0">Material UI Configurator</h5>
          <p>See our dashboard options.</p>
        </div>
        <div className="float-end mt-4">
          <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
            <i className="material-icons">clear</i>
          </button>
        </div>
        {/* End Toggle Button */}
      </div>
      <hr className="horizontal dark my-1" />
      <div className="card-body pt-sm-3 pt-0">
        {/* Sidebar Backgrounds */}
        <div>
          <h6 className="mb-0">Sidebar Colors</h6>
        </div>
        <a href="javascript:void(0)" className="switch-trigger background-color">
          <div className="badge-colors my-2 text-start">
            <span className="badge filter bg-gradient-primary active" data-color="primary"/>
            <span className="badge filter bg-gradient-dark" data-color="dark"/>
            <span className="badge filter bg-gradient-info" data-color="info"/>
            <span className="badge filter bg-gradient-success" data-color="success"/>
            <span className="badge filter bg-gradient-warning" data-color="warning"/>
            <span className="badge filter bg-gradient-danger" data-color="danger"/>
          </div>
        </a>
        {/* Sidenav Type */}
        <div className="mt-3">
          <h6 className="mb-0">Sidenav Type</h6>
          <p className="text-sm">Choose between 2 different sidenav types.</p>
        </div>
        <div className="d-flex">
          <button className="btn bg-gradient-dark px-3 mb-2 active" data-class="bg-gradient-dark">Dark</button>
          <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-transparent">Transparent</button>
          <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-white">White</button>
        </div>
        <p className="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>
        {/* Navbar Fixed */}
        <div className="mt-3 d-flex">
          <h6 className="mb-0">Navbar Fixed</h6>
          <div className="form-check form-switch ps-0 ms-auto my-auto">
            <input className="form-check-input mt-1 ms-auto" type="checkbox" id="navbarFixed"/>
          </div>
        </div>
        <hr className="horizontal dark my-3" />
        <div className="mt-2 d-flex">
          <h6 className="mb-0">Light / Dark</h6>
          <div className="form-check form-switch ps-0 ms-auto my-auto">
            <input className="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version"/>
          </div>
        </div>
        <hr className="horizontal dark my-sm-4" />
        <a className="btn btn-outline-dark w-100">View documentation</a>
        <div className="w-100 text-center">
          <a className="github-button" href="https://github.com/creativetimofficial/material-dashboard" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star creativetimofficial/material-dashboard on GitHub">Star</a>
          <h6 className="mt-3">Thank you for sharing!</h6>
          <a href="https://twitter.com/intent/tweet?text=Check%20Material%20UI%20Dashboard%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard" className="btn btn-dark mb-0 me-2" target="_blank">
            <i className="fab fa-twitter me-1" aria-hidden="true" /> Tweet
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-dashboard" className="btn btn-dark mb-0 me-2" target="_blank">
            <i className="fab fa-facebook-square me-1" aria-hidden="true" /> Share
          </a>
        </div>
      </div>
    </div>
  </div>
  {/*   Core JS Files   */}
  {/* Github buttons */}
  {/* Control Center for Material Dashboard: parallax effects, scripts for the example pages etc */}
</div>
)
}

export default Home2;