<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/user", methods={"GET"})
     */
    public function index(): JsonResponse {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();
        $response = [];

        foreach($users as $user) {
            $response[] = $user->toArray();
        }

        return new JsonResponse($response);
    }

    /**
     * @Route("/user", methods={"POST"})
     */
    public function create(Request $request, UserRepository $repository) {
        $postData = json_decode($request->getContent(), true);

        $user = $repository->createUser($postData['name'], $postData['email'], $postData['password']);

        return new JsonResponse($user->toArray());
    }
}
