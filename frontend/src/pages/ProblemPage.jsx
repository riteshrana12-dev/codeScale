import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api.js";
import CodeEditor from "../components/codeEditor/CodeEditor";
import ProblemDescription from "../components/codeEditor/ProblemDescription";

import { useProblem } from "../context/ProblemContext.jsx";
import { motion } from "framer-motion";
