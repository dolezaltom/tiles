<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="icon" href="./img/icon.png" />
    <title>Madeo</title>
</head>

<body>
    <section id="wrapper">
        <div class="container first-block mb-5">
            <div class="row">
                <div class="col-12 text-center">
                    <span class="extra-text"></span>
                    <h1 class="m-0 get-inspired"></h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div id="tiles" class="row">
            </div>
        </div>
        <div class="container mb-5">
            <div class="row">
                <div class="col-12 d-flex justify-content-center">
                    <div class="open-modal" data-bs-toggle="modal" data-bs-target="#settings-modal">
                        <img src="./img/open-modal.png" alt="Open settings" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Modal -->
    <div class="modal fade" id="settings-modal" tabindex="-1" aria-labelledby="settingsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 px-2 pt-6 border-end">
                                <div class="px-2 d-flex flex-column">
                                    <div class="modal-title mb-3">
                                        <div class="base">
                                            <div class="mask top-0 start-0"></div>
                                            <div class="mask top-0 end-0 opacity-50"></div>
                                            <div class="mask bottom-0 start-0 opacity-50"></div>
                                            <div class="mask bottom-0 end-0 opacity-50"></div>
                                        </div>
                                        <span>Tiles</span>

                                        <button type="button" class="d-block d-lg-none close-btn" data-bs-dismiss="modal" aria-label="Close"><img src="./img/cross.png" alt="Close" /></button>

                                    </div>
                                    <div class="general mb-6">
                                        <span>General</span>
                                    </div>
                                    <div class="display d-flex flex-column pb-6 mb-6">
                                        <span class="display-title mb-1">Display</span>
                                        <select class="form-select display-select">
                                            <option class='display1' value='1' data-imagesrc="/img/onetile.png">3 tiles</option>
                                            <option class='display2' value='2' data-imagesrc="/img/twotile.png">2 tiles and 1 tile</option>
                                        </select>
                                    </div>
                                    <div class="text d-flex flex-column pb-3 mb-6">
                                        <span class="mb-1">Text</span>
                                        <div class="form-group row mb-2">
                                            <label for="title" class="col-4 px-2">Title</label>
                                            <div class="col-8 px-2">
                                                <input class="form-control" id="title" name="title" type="text" value="" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="subtitle" class="col-4 px-2">Subtitle</label>
                                            <div class="col-8 px-2">
                                                <input class="form-control" id="subtitle" name="subtitle" type="text" value="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text d-flex flex-column border-none">
                                        <span class="mb-3">Others</span>
                                    </div>
                                </div>
                                <div class="tiles-visible-box d-flex flex-column mb-3">
                                    <div class="form-check form-switch row d-flex">
                                        <label for="load-switch" class="col-6 px-2 d-flex align-items-center">Tiles limit</label>
                                        <div class="col-6 px-2">
                                            <input class="form-check-input" type="checkbox" id="load-switch">
                                        </div>
                                    </div>
                                    <div class="form-group tiles-visible row m-0 py-1">
                                        <label for="visible" class="col-9 px-2 d-flex align-items-center">Tiles visible</label>
                                        <div class="col-3 px-2">
                                            <input class="form-control" id="visible" name="visible" type="text" value="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-9 px-3 pt-6 table-box d-flex flex-column">
                                <div class="w-100 mb-6 d-none d-lg-block">
                                    <button type="button" class="close-btn" data-bs-dismiss="modal" aria-label="Close"><img src="./img/cross.png" alt="Close" /></button>
                                </div>
                                <div class="w-100 mb-2">
                                    <span class="tiles-title">Tiles</span>
                                    <button type="button" class="btn btn-primary btn-add" id="addTile"><img src="./img/add.png" alt="Add" />Add</button>
                                </div>
                                <div class="table-resp">
                                    <table class="mb-3 mb-lg-2">
                                        <thead>
                                            <tr>
                                                <th><img class="sort" src="./img/sort.png" alt="Sort" /></th>
                                                <th>BG</th>
                                                <th>TEXT</th>
                                                <th>LINK</th>
                                                <th>TARGET</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="sortable">

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="container px-6 m-0">
                        <div class="row">
                            <div class="col-lg-3 px-3 py-2 border-end border-top">
                                <button type="button" class="btn btn-primary w-100" id="updateData">Update</button>
                            </div>
                            <div class="col-lg-9 bg-gray">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="./js/all.js"></script>
</body>

</html>
